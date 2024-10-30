import itDuunitService from './services/itduunitfi';
import { useEffect, useRef, useState } from 'react';
import './styles.css';
import JobItem from './components/JobItem';

//creates field interface for job objects
export interface Job {
  id: number;
  heading: string;
  date_posted: string;
  date_created: string;
  date_ends: string;
  municipality_name: string;
  company_name: string;
  descr: string;
  area_name: string;
  logo_url: string | null;
  link: string;
  main_category: string;
}

const App = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [jobCount, setJobCount] = useState<number | null>(null);
  const [totaljobCount, settotalJobCount] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  //useRef variable to allow keeping state without new page render on each state change
  const timeout = useRef<NodeJS.Timeout | null>(null);

  // fetch jobs from itduunit.fi api served by the backend
  useEffect(() => {
    let loadMoreJobs = true;
    let pageNumber = 0;

    const fetchJobs = async () => {
      while (loadMoreJobs) {
        pageNumber++;
        const { fetchedJobs, next, count } =
          await itDuunitService.getBatch(pageNumber);

        if (pageNumber == 1) {
          setJobCount(count);
          settotalJobCount(count);
        }

        if (fetchedJobs) {
          //after jobs have been fetched set state for filtered and unfiltered job lists
          setJobs((prevJobs) => [...prevJobs, ...fetchedJobs]);
          setFilteredJobs((prevJobs) => [...prevJobs, ...fetchedJobs]);
          if (!next) {
            loadMoreJobs = false;
            setIsLoading(false);
          }
        }
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = jobs.filter((job) =>
        job.heading.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredJobs(filtered);
      if (searchValue) {
        setJobCount(filtered.length);
      } else {
        setJobCount(totaljobCount);
      }
    };
    applyFilters();
  }, [jobs, searchValue, totaljobCount]);

  const handleSearch = (event: { target: { value: string } }) => {
    // if there is an existing timeout instance, clear it
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setSearchValue(event.target.value);
    }, 500);
  };

  return (
    <>
      <h1 className='mainHeading'>Tech Jobs Finland</h1>
      <h2 className='header'>
        Created by <a href='https://github.com/shoutcape'>Ville Kautiainen</a>
      </h2>
      <div>
        <div className='job-searchbar'>
          <div className='job-searchInput'>
            <label>Search</label>
            <input onChange={handleSearch} />
          </div>
          <div className='jobcount'>
            <div>
              <p>Jobs found: {jobCount}</p>
            </div>

            {isLoading && searchValue && (
              <div className='spinner' />
            ) }

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
