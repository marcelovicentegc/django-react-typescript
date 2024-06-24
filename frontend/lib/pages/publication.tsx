import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { type Publication, useApi } from "../api";
import { useParams } from "react-router-dom";
import { FullScreenLoading } from "../components/full-screen-loading";

interface Props {
  data?: Publication;
}

function PublicationPage(props: Props) {
  const { data: publicationData } = props;
  const { publication } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Publication>();
  const { getPublication } = useApi();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (publication) {
      setIsLoading(true);
      setData(await getPublication(publication));
      setIsLoading(false);
    } else {
      setData(publicationData);
    }
  };

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <div>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time>
                      {dayjs(data?.created_at).locale("pt-br").format("LLLL")}
                    </time>
                  </p>
                </div>
              </div>
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {data?.title}
            </h1>
          </header>
          <p className="lead">{data?.description}</p>
          {data?.body}
          <figure className="mt-4">
            <img src={data?.image} alt={data?.image_description} />
            <figcaption>{data?.image_description}</figcaption>
          </figure>
        </article>
      </div>
    </main>
  );
}

export { PublicationPage as default };
