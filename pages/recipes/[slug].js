import { createClient } from "contentful"; //to set up a connection with contentful
import Image from "next/image";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
}); //make connection with contentful space

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "recipes" });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false, //for not found pages
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "recipes",
    "fields.slug": params.slug,
  });

  return {
    props: { recipe: items[0] },
  };
};

export default function RecipeDetails({ recipe }) {
  console.log(recipe);
  const {
    thumbnail,
    title,
    description,
    cookingTime,
    ingredients,
    method,
  } = recipe.fields;

  return (
    <div className="container">
      <div className="banner">
        <Image
          width="400"
          height="550"
          src={`https:${thumbnail.fields.file.url}`}
        />
      </div>
      <div className="info">
        <h2>{title}</h2>
        <p className='time'>Takes about {cookingTime} mins to cook</p>
        <p>{description}</p>
        <h3>Ingredients</h3>
        {ingredients.map((i) => (
          <span key={i}>{i}</span>
        ))}
        <h3>Instructions</h3>
        <p>{method.content[0].content[0].value}</p>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          padding: 25px 15px 25px 15px;
          margin-bottom: 50px;
          width: 70%;
          background-color: #fff;
          border-radius: 10px;
        }

        h3 {
          color: #325288;
        }

        .time {
          margin: 0;
          color: #777;
          font-size: 1.3rem;
          padding: 10px;
        }

        .banner {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-right: 25px;
        }

        .info {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .info h2 {
          text-transform: uppercase;
          margin-top: 25px;
          color: #f4eee8;
          background: #114e60;
          display: inline-block;
          padding: 20px;
          position: relative;
          font-size: 1.6rem;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }

        .container p {
          margin: 0;
          font-size: 1.1rem;
          width: 80%;
        }

        .info span {
          font-size: 1.2rem;
        }

        .info span::after {
          content: ", ";
        }

      `}</style>
    </div>
  );
}
