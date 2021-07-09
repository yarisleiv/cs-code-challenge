const mainContainer = document.getElementById('main');

function useUserlistTemplate(users) {
  const template = Handlebars.compile(document.getElementById('template').innerHTML);
  const filledTemplate = template(users);
  mainContainer.innerHTML = filledTemplate;
}

async function getAllUsers() {
  const url = 'https://reqres.in/api/users';
  const unparsedUsers = await fetch(url);

  if (!unparsedUsers.status === 200) return;
  const parsedUsers = await unparsedUsers.json();

  if (!parsedUsers.data.length) return;
  useUserlistTemplate(parsedUsers);
  return parsedUsers;
}

function showMore(e) {
  if(e.target.classList.contains('user-list-button')) {
    const id = e.target.id[e.target.id.length-1];
    const email = document.getElementById(`email-${id}`);
    const elementId = document.getElementById(`${id}`);
    email.classList.toggle('shown');
    elementId.classList.toggle('shown');
    email.classList.contains('shown') ? e.target.innerText = 'Hide info' : e.target.innerText = 'Show more';
  }
}

getAllUsers();

document.addEventListener('click', showMore);