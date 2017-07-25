export function logIn(username, password){
  return fetch("https://rocky-atoll-46557.herokuapp.com/login", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'mode': 'no-cors'
    },
    method: 'POST',
    body: JSON.stringify({username: username, password: password})
  }).then( res => res.json() )
}

export function signUp(username, password){
  return fetch("https://rocky-atoll-46557.herokuapp.com/signup", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'mode': 'no-cors'
    },
    method: 'POST',
    body: JSON.stringify({username: username, password: password})
  }).then( res => res.json() )
}

// export function fetchCompanies(){
//
// }
