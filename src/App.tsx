import itDuunitService from './services/itduunitfi';
import { useEffect, useRef, useState } from 'react';
import './styles.css';
import JobItem from './components/JobItem';
import TagLists from './components/TagItem';

//creates field interface for job objects
export interface Job {
  id: number;
  heading: string;
  short_heading: string;
  date_posted: string;
  date_created: string;
  date_ends: string;
  slug: string;
  municipality_name: string;
  export_image_url: string;
  company_name: string;
  descr: string;
  latitude: number | null;
  longitude: number | null;
  area_name: string;
  banner_url: string | null;
  logo_url: string | null;
  link: string;
  apply_click_value: string;
  main_category: string;
  hours: string;
  apply_url: string;
  tag_names: string[];
}

const App = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [jobCount, setJobCount] = useState<number|null>(null)

  //useRef variable to allow keeping state without new page render on each state change
  const timer = useRef<NodeJS.Timeout | null>(null);

  // fetch jobs from itduunit.fi api served by the backend
  useEffect(() => {
    let loadMoreJobs = true;
    let pageNumber = 0;
    const fetchJobs = async () => {
      while (loadMoreJobs) {
        pageNumber++;
        const { fetchedJobs, next, count } =
          await itDuunitService.getBatch(pageNumber);
        if (fetchedJobs) {
          setJobs((prevJobs) => [...prevJobs, ...fetchedJobs]);
          setFilteredJobs((prevJobs) => [...prevJobs, ...fetchedJobs]);
          setJobCount(count)
          if (next == false) {
            loadMoreJobs = false;
          }
        }
      }
      //after jobs have been fetched set state for filtered and unfiltered job lists
    };

    const currentTags = localStorage.getItem('currentTags');
    if (currentTags) {
      const parsedTags: string[] = JSON.parse(currentTags);
      setActiveTags(parsedTags);
    }
    fetchJobs();
  }, []);

  useEffect(() => {
    // search for all jobs if there is no active tags
    if (activeTags.length <= 0) {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) =>
        job.tag_names.some((tag) => activeTags.includes(tag)),
      );
      setFilteredJobs(filtered);
    }
  }, [jobs, activeTags]);

  const handleSearch = (event: { target: { value: string } }) => {
    // Allow clearing setTimeout functions current instance if there is an existing timer instance
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      const filtered = jobs.filter((job) =>
        job.heading.toLowerCase().includes(event.target.value.toLowerCase()),
      );
      setFilteredJobs(filtered);
    }, 500);
  };

  const handleTags = (clickedTag: string) => {
    if (activeTags.includes(clickedTag)) {
      const updatedActiveTags = activeTags.filter((tag) => tag !== clickedTag);
      setActiveTags(updatedActiveTags);
      localStorage.setItem('currentTags', JSON.stringify(updatedActiveTags));
    } else {
      const updatedActiveTags = activeTags.concat(clickedTag);
      setActiveTags(updatedActiveTags);
      localStorage.setItem('currentTags', JSON.stringify(updatedActiveTags));
    }
  };

  return (
    <>
      <h1 className='mainHeading'>Tech Jobs Finland</h1>
      <h2 className='header'>
        Created by <a href='https://github.com/shoutcape'>Ville Kautiainen</a>
      </h2>
      <div>
        <TagLists activeTags={activeTags} handleTags={handleTags} />
        <div className='job-active-tags'>
          {activeTags.map((tag, index) => (
            <p key={index} onClick={() => handleTags(tag)}>
              {tag}
            </p>
          ))}
        </div>
        <div className='job-searchbar'>
          <div className='job-searchInput'>
            <label>Search</label>
            <input onChange={handleSearch} />
          </div>
            <div>
              <p>Jobs found: {jobCount}</p>
            </div>
        </div>
        <div className='job-container'>
          {filteredJobs &&
            filteredJobs.map((item: Job, index: number) => (
              <JobItem key={index} job={item} />
            ))}
        </div>
      </div>
    </>
  );
};

export default App;
