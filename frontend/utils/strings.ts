export const TAGLINE = "Your favorite React-Django boilerplate";
export const WEBSITE_URL =
  "https://github.com/marcelovicentegc/django-react-typescript";
export const WEBSITE_NAME = "Django-React-Typescript";
export const BASE = {
  SEARCH: "Search",
  READ_MORE: "Read more",
  LEARN_MORE: "Lear more",
  FOLLOW_ME: "Follow me",
  SHARE: "Share",
  PHONE_NUMBER: "Phone number",
};
export const BLOG_PAGE = {
  TITLE: "Django-React-Typescript blog",
  READ_MORE: BASE.READ_MORE,
  SEARCH: BASE.SEARCH,
};
export const BIOGRAPHY_PAGE = {
  TITLE: "Biography",
};

export const LANDING_PAGE = {
  PREVIEW_SECTION: {
    BIO: {
      TITLE: BIOGRAPHY_PAGE.TITLE,
    },
    BOTTOM_TAG: BASE.LEARN_MORE,
  },
  BLOG_SECTION: {
    TITLE: BLOG_PAGE.TITLE,
    READ_MORE: BASE.READ_MORE,
    SEARCH: BASE.SEARCH,
    BOTTOM_TAG: "See erverything",
  },
  NEWSFEED_SECTION: {
    TITLE: "Would you like to receive news?",
    DESCRIPTION: "Subscribe to receive the latest publications",
    FORM: {
      TARGET: "Target*",
      PLACEHOLDERS: {
        NAME: "Name*",
        EMAIL: "Your email*",
        WHATSAPP: "Your whatsapp number*",
      },
      LABELS: {
        EMAIL: "Email",
        WHATSAPP: "Whatsapp",
      },
      SUBMIT: "Subscribe",
    },
  },
};
export const API = {
  POST_SUBSCRIBER: {
    ERROR: "Something went wrong while trying to subscribe",
    SUCCESS: "Successfully subscribed!",
  },
};

export const FORM_ERRORS = {
  MISSING_NAME_ERROR: "Name is required",
  MISSING_EMAIL_ERROR: "Email is required",
  MISSING_PHONE_NUMBER_ERROR: "Phone number is required",
  MISSING_SUBJECT_ERROR: "Subject is required",
  MISSING_MESSAGE_ERROR: "Message é obrigatória",
  INVALID_EMAIL_ERROR: "Please, type in a valid email",
};

export function truncate(str: string, n: number, useWordBoundary: boolean) {
  if ((str && str.length <= n) || !str) {
    return str;
  }

  const subString = str.substr(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "&hellip;"
  );
}

export function titlefy(slug: string) {
  var words = slug.split("-");

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
}
