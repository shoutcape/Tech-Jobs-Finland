import { Job } from './Duunit';

interface JobItemProps {
  job: Job;
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  
  const description = (desc: string) => {
    if (desc.length > 200) {
      return desc.substring(0,200) + '...'
    }
    return desc
  }

  return (
    <div className='job-item'>
      <a href={job.link}>
        <div className='job-split'>
          <div className='job-heading'>
            <p>{job.heading}</p>
            <p className='job-desc'>{description(job.descr)}</p>
          </div>
          {job.logo_url ? (
            <div className='job-logo'>
              <img src={job.logo_url} />
            </div>
          ) : (
            <div className='job-company'>
              <p>{job.company_name.substring(0, 25)}</p>
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default JobItem;
