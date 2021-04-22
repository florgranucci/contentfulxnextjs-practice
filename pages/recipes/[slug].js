import { createClient } from 'contentful'; //to set up a connection with contentful
import Image from 'next/image';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
}); //make connection with contentful space

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: 'recipes' })
  
  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug}
    }
})

  return {
    paths,
    fallback: false, //for not found pages
  }
}

export const getStaticProps = async ({ params }) => {
   const { items } = await client.getEntries({ 
     content_type: 'recipes',
     'fields.slug': params.slug
    })

    return {
      props: { recipe: items[0] }
    }
}

export default function RecipeDetails({ recipe }) {
  
  console.log(recipe)
  const { featureImage, title, description, cookingTime, ingredients, method } = recipe.fields
  
  return (
    <div>
      <div className='banner'>
        <Image
          width={featureImage.fields.file.details.image.width}
          height={featureImage.fields.file.details.image.height}
          src={`https:${featureImage.fields.file.url}`} 
        />
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className='info'>
        <p>Takes about ${cookingTime} mins to cook</p>
        <h3>Ingredients</h3>
        {ingredients.map(i => (
          <span key={i}>{i}</span>
        ))}
        <h3>Instructions</h3>
        <p>{method.content[0].content[0].value}</p>
      </div>
    </div>
  )
}