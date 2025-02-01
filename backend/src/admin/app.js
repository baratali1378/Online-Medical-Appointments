
const config = {
  locales: ['en'],
  tutorials: false,
  notifications: {
    releases: false,
  },
  translations: {
    en: {
      "Auth.form.welcome.title": "Welcome Back!",
      "Auth.form.welcome.subtitle": "Easily manage doctor appointments",
    },
  },
  title: "Oppointment"
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
