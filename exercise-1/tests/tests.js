QUnit.test('Main container is shown', assert => {
    assert.notEqual(mainContainer, null, 'Main container exists');
});

QUnit.test('Get proper user-list from API', async assert => {
    const done = assert.async();
    await getAllUsers().then(allUsers => {
        assert.equal(typeof allUsers, 'object', 'Users list is object');
        assert.equal(Array.isArray(allUsers.data), true, 'User list contains array');
        assert.notEqual(allUsers.data.length, 0, 'User list is not empty');
        assert.notEqual(document.getElementsByClassName('user-list__item'), 0, 'All users are shown');
        done();
    });
  });

  QUnit.test('Check if everything is rendered properly', async assert => {
    const done = assert.async();
    await getAllUsers().then(allUsers => {
        const userCards = document.querySelectorAll('.user-list__item');
        userCards.forEach(userCard => {
            const avatar = userCard.children[0].children[0].classList.contains('user-list-avatar');
            const info = userCard.children[0].children[1].classList.contains('user-list-info');
            const name = userCard.children[0].children[1].children[0].classList.contains('user-list-name');
            const email = userCard.children[0].children[1].children[1].classList.contains('user-list-email');
            const id = userCard.children[0].children[1].children[2].classList.contains('user-list-id');

            assert.equal(avatar, true, 'User-card has avatar');
            assert.equal(info, true, 'User-card contains user-info');
            assert.equal(name, true, 'User-card contains name');
            assert.equal(email, true, 'User-card contains email');
            assert.equal(id, true, 'User-card contains id');
        })
        done();
    });
  });

  QUnit.test('Check show-more button', async assert => {
    const done = assert.async();
    await getAllUsers().then(allUsers => {
        const button = document.getElementsByClassName('user-list-button')[0];
        const info = button.parentNode;
        const email = info.children[1];
        const id = info.children[2];

        assert.equal(email.classList.contains('shown'), false, 'email is hidden by default');
        assert.equal(id.classList.contains('shown'), false, 'id is hidden by default');

        button.click();

        assert.equal(email.classList.contains('shown'), true, 'email is shown when you click on the button');
        assert.equal(id.classList.contains('shown'), true, 'id is shown when you click on the button');

        done();
    });
  });