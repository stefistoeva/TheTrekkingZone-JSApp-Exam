
function getPartials() {
    return {
        header: './views/common/header.hbs', 
        footer: './views/common/footer.hbs',
        // homeAnon: './views/home-anon.hbs'
    };
}

export function getTemplate(ctx, path) {
    ctx.loadPartials(getPartials())
        .partial(path);
}


//userHelper---------------------
export function saveAuthInfo(userInfo) {
    sessionStorage.setItem('authtoken', userInfo._kmd.authtoken);
    sessionStorage.setItem('username', userInfo.username);
    sessionStorage.setItem('userId', userInfo._id);
}

export function setHeaderInfo(ctx) {
    ctx.isAuth = sessionStorage.getItem('authtoken') !== null;
    ctx.username = sessionStorage.getItem('username');
}

//notifications------------------
// export function displayError(msg) {
//     const errorBox = document.getElementById('errorBox');
//     errorBox.style.display = 'block';
//     errorBox.textContent = msg;
//     setTimeout(() => {
//         errorBox.style.display = 'none';
//     }, 2000);
// }

// export function displaySuccess(msg) {
//     const errorBox = document.getElementById('successBox');
//     errorBox.style.display = 'block';
//     errorBox.textContent = msg;
//     setTimeout(() => {
//         errorBox.style.display = 'none';
//     }, 2000);
// }

// export function displayLoading(msg) {
//     const errorBox = document.getElementById('loadingBox');
//     errorBox.style.display = 'block';
//     errorBox.textContent = msg;
//     setTimeout(() => {
//         errorBox.style.display = 'none';
//     }, 2000);
// }