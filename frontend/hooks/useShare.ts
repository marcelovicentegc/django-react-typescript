// Based on react-share
// https://github.com/nygardk/react-share/

class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssertionError";
  }
}

function assert(value: any, message: string) {
  if (!value) {
    throw new AssertionError(message);
  }
}

function objectToGetParams(object: {
  [key: string]: string | number | undefined | null;
}) {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    );

  return params.length > 0 ? `?${params.join("&")}` : "";
}

function isMobileOrTablet() {
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
}

type LinkedinOptions = {
  /** The url-encoded title value that you wish you use. */
  title?: string;
  /** The url-encoded description that you wish you use. */
  summary?: string;
  /** The url-encoded source of the content (e.g. your website or application name) */
  source?: string;
};

type EmailOptions = {
  body?: string;
  separator?: string;
  subject?: string;
};

export function useShare() {
  function onFacebook(
    url: string,
    { quote, hashtag }: { quote?: string; hashtag?: string }
  ) {
    return (
      "https://www.facebook.com/sharer/sharer.php" +
      objectToGetParams({
        u: url,
        quote,
        hashtag,
      })
    );
  }

  function onLinkedin(
    url: string,
    { title, summary, source }: LinkedinOptions
  ) {
    return (
      "https://linkedin.com/shareArticle" +
      objectToGetParams({ url, mini: "true", title, summary, source })
    );
  }

  function onTwitter(
    url: string,
    {
      title,
      via,
      hashtags = [],
      related = [],
    }: { title?: string; via?: string; hashtags?: string[]; related?: string[] }
  ) {
    assert(Array.isArray(hashtags), "twitter.hashtags is not an array");
    assert(Array.isArray(related), "twitter.related is not an array");

    return (
      "https://twitter.com/share" +
      objectToGetParams({
        url,
        text: title,
        via,
        hashtags: hashtags.length > 0 ? hashtags.join(",") : undefined,
        related: related.length > 0 ? related.join(",") : undefined,
      })
    );
  }

  function onWhatsapp(
    url: string,
    { title, separator }: { title?: string; separator?: string }
  ) {
    return (
      "https://" +
      (isMobileOrTablet() ? "api" : "web") +
      ".whatsapp.com/send" +
      objectToGetParams({
        text: title ? title + separator + url : url,
      })
    );
  }

  function viaEmail(url: string, { subject, body, separator }: EmailOptions) {
    return (
      "mailto:" +
      objectToGetParams({ subject, body: body ? body + separator + url : url })
    );
  }

  return { onFacebook, onLinkedin, onTwitter, onWhatsapp, viaEmail };
}
