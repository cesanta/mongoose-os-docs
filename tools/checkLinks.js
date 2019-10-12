const fs = require("fs")
const child = require("child_process")
const https = require("https")
const http = require("http")

const p = console.log

function collectMDFiles( baseDir ) {
	let fns = child.execSync(`find ${baseDir} -name '*.md' -print`)
	fns = fns.toString().split(/\r?\n/)
	return fns.slice(0, fns.length-1)
}

const SKIP = [
	"https://IP_ADDRESS" // example in security.md
	,"http://localhost:8910/" // example in debug.md
	,"https://license.mongoose-os.com" // 405, but ok presumably
	,"https://dash.mongoose-os.com/"
	,"https://dash.mongoose-os.com"
	,"https://mdash.net/" //.. to here ditto 405
]

// map(url)=>(map(fn)=>count)
let store = {}
function addURL(url, fn) {
	for (var i = 0; i!=SKIP.length; ++i) {
		if (url === SKIP[i]) {return}
	}
	if (store[url]) {
		store[url][fn] += 1
	} else {
		store[url] = {}
		store[url][fn] = 1

	}
}
function processMatches(fn, matches) {
	if (!matches) return
	for (let m of matches) {
		m = m.replace(/\)? ?$/, '')
		m = m.replace(/, ?$/, '')
		m = m.replace(/\. ?$/, '')
		m = m.replace(/\)? ?$/, '')
		m = m.replace(/">Buy/, '')
		m = m.replace(/<.*/, '')
		m = m.replace(/`/, '')
		m = m.replace(/\)\*\*/, '')
		addURL(m, fn)
	}
}
function processFile(fn) {
	data = fs.readFileSync(fn)
	str = data.toString()
	regexp = /https?:\S+ /g
	ms = str.match(regexp)
	processMatches(fn, ms)
}

var error = {}
function addError(key, url, msg) {
	let o = {url, msg}
	if (error[key]) {
		error[key].push(o)
	} else {
		error[key] = [o]
	}
}

function checkURL(url) {
	var _http = url.match(/^https/) ? https : http
	let req = _http.request(url, {method:"HEAD", timeout:3000}, (resp, err) => {
		if (err) {p("err "+err)}
		if (resp.statusCode !== 200) {
			// p(`${resp.statusCode} : ${resp.statusMessage} (${url}: ${store[url]})`)
			addError( `${resp.statusCode} : ${resp.statusMessage}`, url, resp.headers['location']) 
		}
	})
	req.on("error", (err) => { addError(err, url, ""); req.abort()} )
	req.on("timeout", () => { addError("timeout", url, ""); req.abort()} )
	req.end()
}

let baseDir = process.argv[2]
let fns = collectMDFiles(baseDir)



for (let i = 0 ; i!= fns.length; ++i) {
	if (!fns[i] || fns[i].trim() === "") continue
	processFile(fns[i])
}

//Object.keys(store).forEach( (url)=> {p(`${url} : ${Object.keys(store[url])}`)}) 
p("----")
Object.keys(store).forEach( (url) => { checkURL(url) })
p("----")

function dump() {
Object.keys(error).forEach ( (err) => {
	p("\n---------")
	p(err)
	p("---------")
	error[err].forEach( (m) => {
		p(m.url)
		if (err.match( /^30/ )) {
			p(`new: ${m.msg}`)
		}
		p(`affects: ${Object.keys(store[m.url])}`)
		p()
	})
} )
}

setTimeout( dump, 3000)

