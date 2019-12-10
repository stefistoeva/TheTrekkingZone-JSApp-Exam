import { getHome } from "./controllers/homeController.js";
import { getRegister, getLogin, postRegister, postLogin, logoutUser, getProfile } from "./controllers/userController.js";
import { getCreate, postCreate, getDetail, deleteTrek, getEdit, postEdit, postLike } from "./controllers/treksController.js";

const app = Sammy('body', function() {
    this.use('Handlebars', 'hbs');

    this.get('/', getHome);

    this.get('/register', getRegister);
    this.post('/register', postRegister);
    this.get('/login', getLogin);
    this.post('/login', postLogin);
    this.get('/profile', getProfile);
    this.get('/logout', logoutUser);

    this.get('/create', getCreate);
    this.post('/create', postCreate);
    this.get('/treks/:id', getDetail);
    this.get('/edit/:id', getEdit);
    this.post('/edit/:id', postEdit);
    this.get('/like/:id', postLike);
    this.get('/close/:id', deleteTrek);
});

app.run('/');