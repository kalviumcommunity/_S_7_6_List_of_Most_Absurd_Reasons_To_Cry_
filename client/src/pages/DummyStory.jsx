import React from 'react';
import Story from '../component/Story';


const DummyStory= () => {
    const dummyStory =[
        {
        title: "The time I cried over when I broke a vase which was already broken and i ruined it while fixing them.",
        content: "The vase was broken by my brother when I tried to fix it back i broke it completely",
        author: "Santhanam"
        },
        {
            title: "The time I cried over when I broke my brother glass which was already broken and i ruined it while fixing them.",
        content: "The glass was broken by my brother when I tried to fix it back i broke it completely",
        author: "Deva"
        }
    ]


    return(
        <div className='App'>
            
            {
                dummyStory.map((story)=>(      
                    <Story story={story} key={story.id}/>
                ))}
        </div>
    );
}

export default DummyStory;