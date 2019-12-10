import { getTemplate, saveAuthInfo, setHeaderInfo } from "../helpers/storage.js";
import { post, get } from "../helpers/requester.js";

export function getRegister(ctx) {
    setHeaderInfo(ctx);
    getTemplate(ctx, './views/user/register.hbs');
}

export function postRegister(ctx) {
    const { username, password, rePassword } = ctx.params;
    
    if(username && password && password === rePassword) {
        post('user', '', { username, password }, 'Basic')
        .then((userInfo) => {
            saveAuthInfo(userInfo);
            ctx.redirect('/');
        })
        .catch(console.error);
    }
}

export function getLogin(ctx) {
    setHeaderInfo(ctx);
    getTemplate(ctx, './views/user/login.hbs');
}

export function postLogin(ctx) {
    const { username, password } = ctx.params;

    if(username && password) {
        post('user', 'login', { username, password }, 'Basic')
            .then((userInfo) => {
                saveAuthInfo(userInfo);
                ctx.redirect('/');
            })
            .catch(() => displayError('Something went wrong!'));
    }
}

export function getProfile(ctx) {
    setHeaderInfo(ctx);

        if(ctx.isAuth) {
            get('appdata', 'treks', 'Kinvey')
                .then((treks) => {
                    const myTreks = treks.filter(x => x.organizer === sessionStorage.getItem('username'));
                    ctx.treks = myTreks;
                    ctx.numberOfEvents = myTreks.length;
                    getTemplate(ctx, '../views/user/profile.hbs');
                });
        } else {
            getTemplate(ctx, '../views/user/profile.hbs');
        }

    
    // async function getProfile(ctx) {
        // setHeaderInfo(ctx);
        // let events = await getAllEvents();
        // get(`appdata/${appKey}/events`)
        
        // get('appdata', `treks`, 'Basic')
        // .then((treks) => {
        //     console.log(treks);
        //     console.log(ctx);
        //     getTemplate(ctx, './views/user/profile.hbs');
        //     })
        //     .catch(console.error)
        // let myEvents = events.filter(x => x.organizer === ctx.username);
        // ctx.events = myEvents;
        // ctx.numberOfEvents = myEvents.length;
        // this.loadPartials(getPartials()).partial("../views/auth/profile.hbs");
}

export function logoutUser(ctx) {
    post('user', '_logout', {}, 'Kinvey')
        .then(() => {
            sessionStorage.clear();
            ctx.redirect('/');
        })
        .catch(console.error);
}