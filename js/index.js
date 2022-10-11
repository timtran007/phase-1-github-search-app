//Deliverables
/*
create an application that searches GitHub for users by name and displays the results on the screen

Clicking on a specific user will show all the repositories for that user

1. There is a form on index.html, when enter name, it matches to the database and pulls up the User Search Endpoint ---> https://api.github.com/search/users?q=octocat

2. Using the results of the search, display information about the users to the page (include: username, avatar and link to profile)

3. Clicking on a user should send a request to the User Repos Endpoint -> https://api.github.com/users/octocat/repos return data about all the repositories for that user

4. display all the repositories for that user on the page

PSUEDOCODE
add event listener to input and submit button,

make sure submit button does not take default action

grab what is typed into input and match within User Search Endpoint Database

append results on page to include: userName, avatar, and linkToProfile

Add event listener to user profiles

match user profile to User Repos Endpoint

append results of the repositories for user on page
*/

// code starts here
let list = document.querySelector('#user-list')

document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('#github-form')
    form.addEventListener("submit", (e)=> {
        e.preventDefault()
        let target = document.querySelector('input')
        let targetValue = target.value
        if(targetValue.length > 0){
            fetch(`https://api.github.com/users/${targetValue}`)
            .then(response => response.json())
             .then((data) => {
                console.log(data)
                let matchedProfile = document.createElement('li') 
                matchedProfile.className ='profile'
                matchedProfile.innerHTML = `
                    <div>
                        <h2>${data.login}</h2>
                        <img class ="profile-image" src="${data.avatar_url}">
                        <div class = "content">
                         <p>
                            <span class = "link-to-profile"><a href="${data.html_url}">${data.html_url}</a></span>
                        </p>
                        </div>
                    </div>
                `
                document.querySelector("#user-list").appendChild(matchedProfile)
                let clickTrigger = document.querySelector(".profile-image")
                clickTrigger.addEventListener('click', ()=>{
                        fetch(`https://api.github.com/users/${targetValue}/repos`)
                        .then (response => response.json())
                        .then (data => {
                            console.log(data)
                            data.forEach(repo => {
                                let matchedRepos = document.createElement('li')
                                matchedRepos.innerHTML = `
                                    <p>
                                    <a href="${repo.html_url}"> ${repo.name}</a>
                                    <p>
                                 `
                                document.querySelector("#repos-list").appendChild(matchedRepos)
                            })  
                            
                        })
                        
                })
               
            })
            e.target.reset()
        } 
    })
})


