export function logIn(username, password){
  return fetch("http://localhost:3000/login", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({username: username, password: password})
  }).then( res => res.json() )
}

export function signUp(params){
  return fetch("http://localhost:3000/signup", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(params)
  }).then( res => console.log("APICALLS API: ", res) )
}
