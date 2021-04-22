import Link from 'next/link';
import Image from 'next/image';

export const RecipeCard = ({ recipe }) => {

    const { title, slug, cookingTime, thumbnail } = recipe.fields
    
    return (
        <div className="card">
            <div className="featured">
                <Image 
                width='300'
                height='400'
                src={`https:${thumbnail.fields.file.url}`} />
            </div>
            <div className="content">
               <div className="info">
                <h4>{title}</h4>
                <p className="time">Takes approx {cookingTime} mins to make</p>
               </div>
               <div className="actions">
                   <Link href={`/recipes/${slug}`}><a>Cook this</a></Link>
               </div>
            </div>

            <style jsx>{`
                .card {
                max-width: 300px;
                max-height: 800px;
                display: flex;
                flex-direction: column;
                margin: 10px;
                padding: 10px;
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.3s;
                border-radius: 8px;
                }

                .card:hover {
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
                }

                .featured {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .content {
                    padding: 15px;
                }
                
                .content .info {
                    height: 100px;
                    padding-bottom: 15px;
                }

                .content .info h4 {
                    color: #114e60;
                }

                .content .info p {
                    font-size:1rem;
                }

                .content .actions a {
                    text-decoration: none;
                    color: #325288;
                    text-transform: uppercase;
                    font-size: 1rem;
                }

            `}</style>

        </div>
    )
}
