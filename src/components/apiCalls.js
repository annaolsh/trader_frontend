// 
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

export function signUp(username, password){
  return fetch("http://localhost:3000/signup", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({username: username, password: password})
  }).then( res => res.json() )
}

export function fetchUser(){
  fetch(`http://localhost:3000/users/${localStorage.id}`, {
    headers: {
    'Authorization': localStorage.getItem('jwt')
    }
  }).then(res => console.log(res))
}

export function liveData(selectedCompany){
   return fetch(`http://localhost:3000/companies/${selectedCompany}`, {
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
   }).then( res => res.json() )
 }

 export function fetchCompanies(){
   return fetch("http://localhost:3000/companies", {
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     method: 'GET',
   }).then(res => res.json())
 }

 export function saveAction(actionInfo){
   return fetch('http://localhost:3000/actions', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(actionInfo)
   })
   .then(res => res.json())
 }
