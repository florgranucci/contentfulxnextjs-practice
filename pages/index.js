import { createClient } from 'contentful'; //to set up a connection with contentful
import { RecipeCard } from '../components/RecipeCard';

export const getStaticProps = async () => {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  }); //make connection with contentful space

  const res = await client.getEntries({ content_type: 'recipes'}); //content model ID
  
  return {
    props: {
      recipes: res.items
    }
  }
}

export default function Recipes({ recipes }) {
  console.log(recipes)
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}

      <style jsx>{`
        
        .recipe-list{
          width: 90%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 20px;
          margin-bottom: 80px;
        }

      `}</style>
    </div>
  )
}