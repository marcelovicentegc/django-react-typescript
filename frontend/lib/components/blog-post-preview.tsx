import React from "react";
import { Button, Card } from "flowbite-react";
import { Publication } from "../api";
import dayjs from "dayjs";
import { ROUTES, useRouter } from "../routes";

interface Props {
  data: Publication;
}

export function BlogPostPreview(props: Props) {
  const { data } = props;
  const { push } = useRouter();

  return (
    <Card
      className="max-w-sm mt-4"
      imgAlt={data.image_description}
      imgSrc={data.image}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data.title} {dayjs(data.created_at).locale("pt-br").format("LLLL")}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {getPreview(data)}
      </p>
      <Button onClick={() => push(ROUTES.BLOG + "/" + data.slug)}>
        Read more
        <svg
          className="-mr-1 ml-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Card>
  );
}

function getPreview(data: Publication) {
  const preview = data.description ? data.description : data.body;

  return preview.slice(0, 50);
}
