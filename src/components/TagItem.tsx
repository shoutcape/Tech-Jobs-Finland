import taglist from '../data/tags.json';

interface TagItemProps {
  activeTags: string[];
  handleTags: (tag:string) => void
}

type Tags = {
  [category: string]: string[];
};

const TagItem: React.FC<TagItemProps> = ({activeTags, handleTags}) => {
  const tags: Tags = taglist.tags;
  return (
      <div className='job-tags'>
        {
          //create an array from tags example:[category, [tags]]
          Object.entries(tags).map(([category, tags]) => (
            <div className='job-tag-container' key={category}>
              <h3>{category}</h3>
              <ul>
                {
                  //map over current category tags
                }
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className={
                      activeTags.includes(tag)
                        ? 'job-tag-active'
                        : 'job-tag-inactive'
                    }
                    onClick={() => handleTags(tag)}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          ))
        }
      </div>
  )
};

export default TagItem;
