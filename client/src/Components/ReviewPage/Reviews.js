import React, { useState, useEffect } from 'react';
import { Card, Button, TextInput, Select, createStyles, useMantineTheme, Textarea} from '@mantine/core';
import {ReactComponent as Star}  from '../star-svgrepo-com.svg'
import axios from 'axios';
import { faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyle = createStyles((theme) => ({
  page: {
      backgroundColor: 'rgb(255, 213, 128)',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      overflowX: 'hidden', 
      height: '100vh',
  },
  page2: {
      backgroundColor: 'rgb(255, 213, 128)',
      backgroundSize: 'cover',
      height: '100%',
  },
  
reviewsContainer: {
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'auto',
  flexDirection: 'row',
  gap: theme.spacing.md,
  padding: theme.spacing.md,
  minWidth: '100vh',
  maxWidth: '100vh',
  marginLeft: '20px',
  height: '100%',
  minHeight: '100vh',
  maxHeight: '100vh',
  overflowY: 'auto',
  scrollBehavior: 'smooth',
},
reviewCard: {
  //minWidth: 'calc(33%)',
  minWidth: '250px',
  maxWidth: '250px',
  minHeight: '205px',
  maxHeight: '205px',
  marginBottom: theme.spacing.md,
  backgroundColor:'rgb(255, 255, 204)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
},
reviewCardContent: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing.md,
},
reviewTitle: {
  marginBottom: theme.spacing.sm,
  fontSize: theme.fontSizes.lg,
  fontWeight: 'bold',
},
reviewDetails: {
  marginBottom: theme.spacing.xs,
  color: theme.colors.gray[6],
},
input: {
  minWidth: 200,
  flex: 1,
},
select: {
  width: 200,
},
modalBody: {
  padding: theme.spacing.md,
  fontFamily: 'Arial. sans-serif',
  letterSpacing: '1px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
},
closeButton: {
  marginTop: '15px',
  fontWeight: 'bold',
},
selectedReviewContainer: {
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'auto',
  flexDirection: 'row',
  minWidth: '90vh',
  fontFamily: 'Merriweather, serif',
  justifyContent: 'center',
  minHeight: '100vh',
},
selectedReviewCard: {
 maxWidth: 'calc(90%)',
 maxHeight: '80vh',
 minHeight: '20vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor:'rgb(255, 255, 204)',
  border: '1px solid #ccc',
  borderRadius: '3px',
  padding: '15px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
},
selectedReviewTitle: {
  fontFamily: 'Arial. sans-serif',
  fontSize: '15px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  color: '#333',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
},
selectedReviewInfo: {
 color: theme.colors.gray[50],
 fontSize: '15px',
 marginRight: '900px',
 whiteSpace: 'nowrap',
}, 
columnContainer: {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.md,
  minWidth: '30%',
  maxWidth: '30%',
  height: '100vh',
  marginTop: '15px',
  marginLeft: '100px',
  overflow: 'hidden',
  position: 'sticky',
  
},
filterContainer: {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
  backgroundColor: '#ffffff',
  border: '1px solid #ccc',
  borderRadius: '3px',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
},
filterButton: {
  marginTop: theme.spacing.sm,
},
addReviewContainer: {
  display: 'flex',
  flexDirection: 'column',
  gap: '7px',
  marginTop: '5px',
  backgroundColor: '#ffffff',
  border: '1px solid #ccc',
  borderRadius: '3px',
  padding: '30px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
},
deleteButton: {
    display: 'flex',
    color: 'red',
    cursor: 'default',
    marginLeft: '60px',
    '&:hover': {
      textDecoration: 'underline',
    }
},
likeButton: {
  display: 'flex',
  color: 'blue',
  cursor: 'default',
  whiteSpace: 'nowrap',
  minWidth: '70px',
  maxWidth: '70px',
  },
  noLikeButton: {
    display: 'flex',
    color: 'lightblue',
    cursor: 'default',
    whiteSpace: 'nowrap',
    minWidth: '70px',
    maxWidth: '70px',
    '&:hover': {
      color: 'darkblue',
    }
    },
deleteIcon: {
  marginLeft: '5px',
  '&:hover': {
    color: 'darkred',
  }
}
}));



const dateTimeFormat = (date) => {
  date = new Date(date);
    // Get the month, day, and year components
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const day = String(date.getDate()).padStart(2, '0');
   const year = date.getFullYear();
   const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
   
    // Format the date as "mm/dd/yyyy"
   const formattedDate = `${month}/${day}/${year}`;
   return formattedDate + ' at ' + time
  };

const terms = [
  { value: 'Spring 2023', label: 'Spring 2023' },
  { value: 'Fall 2022', label: 'Fall 2022' },
  { value: 'Spring 2022', label: 'Spring 2022' },
  { value: 'Fall 2021', label: 'Fall 2021' },
  { value: 'Spring 2021', label: 'Spring 2021' },
  { value: 'Fall 2020', label: 'Fall 2020' },
  { value: 'Spring 2020', label: 'Spring 2020' },
  { value: 'Fall 2019', label: 'Fall 2019' },
  { value: 'Spring 2019', label: 'Spring 2019' },
  { value: 'Fall 2018', label: 'Fall 2018' },
  { value: 'Spring 2018', label: 'Spring 2018' },
  { value: 'Fall 2017', label: 'Fall 2017' },
  { value: 'Spring 2017', label: 'Spring 2017' },
]

const Reviews = () => {
  const user = localStorage.getItem('username');
  const config = { headers: {
    'Authorization' : `Bearer ${localStorage.getItem('token')}`
  }
  }
  useEffect(() => {
    const fetchRevs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/reviews');
        response.data.sort((a, b) => new Date(b.posttime) - new Date(a.posttime));
        setFilteredReview(response.data);
        setReviews(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRevs();
  }, []);
   
  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/reviews');
      switch (sortBy) {
        case 'termTaken':
          response.data.sort((a, b) => {
              a = a.termTaken.split(/\b/)
              b = b.termTaken.split(/\b/)
              console.log(parseInt(b[2]))
              if(parseInt(a[2]) !== parseInt(b[2])) {
                  return parseInt(b[2]) - parseInt(a[2])
              } else {
                  return a[0].localeCompare(b[0]);
              }
          });
          break;
        case 'posttime':
          response.data.sort((a, b) => new Date(b.posttime) - new Date(a.posttime));
          break;
        default:
          break;
      }
      setFilteredReview(response.data);
      setReviews(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }; 



  const [reviews, setReviews] = useState([]);
  const [filteredReview, setFilteredReview] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [newReview, setNewReview] = useState({
    userName: user,
    className: '',
    college: '',
    professor: '',
    termTaken: '',
    rating: null,
    contents: '',
    reviewTitle: '',
    posttime: new Date(),
    likesCount: 0,
    likes: [],
  });
  const [filterValues, setFilterValues] = useState({
    className: '',
    college: '',
    professor: '',

  });
  const [sortBy, setSortBy] = useState('posttime');

  const { classes } = useStyle();
  const theme = useMantineTheme();

  const handleFilterChange = (category, value) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [category]: value,
    })
    );
  };

  const handleNewReviewChange = (category, value) => {
    setNewReview((prevValues) => ({
      ...prevValues,
      [category]: value,
    })
    );
  };

  const handleAddNewReviewChange = async () => {
   const { userName, className, college, professor, termTaken, rating, contents, reviewTitle, likes, likesCount } = newReview;
    try {
      const axiosInstance = axios.create(config);
      await axiosInstance.post('http://localhost:4000/api/reviews', {userName,className, college, professor, termTaken, rating, contents, reviewTitle, likes, likesCount});
      console.log('Review added successfully!');
      // Reset the new review form
      setNewReview({
        userName: user,
        className: '',
        college: '',
        professor: '',
        termTaken: '',
        rating: '',
        contents: '',
        reviewTitle: '',
        likesCount: 0,
        likes: [],
      });
      fetchReviews()
      handleFilter()
      handleSortOptionChange(sortBy)
    } catch (error) {
      console.error('Error:', error);
    }

  };


  const handleDelete = async (event, id) => {
    event.stopPropagation();
     try {
       const axiosInstance = axios.create(config);
       await axiosInstance.delete(`http://localhost:4000/api/reviews/${id}`);
       console.log('Review deleted successfully!');
       // Reset the new review form
       fetchReviews()
       handleFilter()
       handleSortOptionChange(sortBy)
     } catch (error) {
       console.error('Error:', error);
     }
 
   };

    const handleFilter = () => {
      let filteredResult = reviews;
    
      if (filterValues.className !== '') {
        filteredResult = filteredResult.filter(
          (review) =>
            review.className.toLowerCase() === filterValues.className.toLowerCase()
        );
      }
    
      if (filterValues.college !== '') {
        filteredResult = filteredResult.filter(
          (review) =>
            review.college.toLowerCase() === filterValues.college.toLowerCase()
        );
      }
    
      if (filterValues.professor !== '') {
        filteredResult = filteredResult.filter(
          (review) =>
            review.professor.toLowerCase() === filterValues.professor.toLowerCase()
        );
      }
    
      setFilteredReview(filteredResult);
    };


  const handleSortOptionChange = (value) => {
    setSortBy(value);
    sortData(value);
  };
  const sortData = (option) => {
    // Create a copy of the data array to avoid mutating the original array
    const newData = [...filteredReview];

    switch (option) {
      case 'termTaken':
        newData.sort((a, b) => {
            a = a.termTaken.split(/\b/)
            b = b.termTaken.split(/\b/)
            console.log(parseInt(b[2]))
            if(parseInt(a[2]) !== parseInt(b[2])) {
                return parseInt(b[2]) - parseInt(a[2])
            } else {
                return a[0].localeCompare(b[0]);
            }
        });
        break;
      case 'posttime':
        newData.sort((a, b) => new Date(b.posttime) - new Date(a.posttime));
        break;
      case 'likes':
          newData.sort((a, b) => b.likesCount - a.likesCount);
        break;
      default:
        break;
    }
    setFilteredReview(newData);
  };

  const handleTerms = (value) => {
    handleNewReviewChange('termTaken', value)
  }

  const handleLikes = async (event, id, flag) => {
    event.stopPropagation();
    try {
      const response = await axios.get(`http://localhost:4000/api/reviews/${id}`);
      const review = response.data;
  
      // Check if the user ID is present in the likes array
      const userIndex = review.likes.indexOf(user);
  
      if (userIndex !== -1) {
        // User already liked the review, remove the user ID and decrease likesCount
        review.likes.splice(userIndex, 1);
        review.likesCount -= 1;
      } else {
        // User hasn't liked the review, add the user ID and increase likesCount
        review.likes.push(user);
        review.likesCount += 1;
      }
      const axiosInstance = axios.create(config);
      // Update the review with the modified likes and likesCount
      await axiosInstance.put(`http://localhost:4000/api/reviews/${id}`, review);
  
      console.log('Review likes updated successfully!');
      fetchReviews();
      handleFilter();
      handleSortOptionChange(sortBy);
      if (flag === 1) {
        setSelectedReview(review)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


if(!selectedReview) {

  return (
    <div className={classes.page}>
      <div className={classes.reviewsContainer}>
        {filteredReview.map((review) => (
          <Card
            key={review.id}
            shadow="sm"
            className={classes.reviewCard}
            onClick={() => {setSelectedReview(review)
        }}
          >
            <div className={classes.reviewCardContent}style ={{marginTop: '-5px'}}>
              <div className={classes.reviewTitle}>{review.className}</div>
              <div className={classes.reviewDetails}>
                <span style={{ whiteSpace: 'nowrap' }}> College: <strong>{review.college}</strong></span>
                <br></br>
                <span>Professor:  <strong>{review.professor}</strong></span>
                <br></br>
                <span style={{ whiteSpace: 'nowrap' }}>Term Taken:  <strong>{review.termTaken}</strong></span>
                <br></br>
                <span style={{ whiteSpace: 'nowrap' }}>Posted On: <strong> {dateTimeFormat(review.posttime).slice(0,11)} </strong></span>
              </div>
              <span style ={{display: 'flex', flexDirection: 'row', marginTop: '-3px'}}>
              <div>Rating: {review.rating}/5</div>
              <Star/>
              </span>
              <div style = {{display: 'flex', flexDirection: 'row', marginTop: '10px'}}>
              <div className={review.likes.includes(user) ? classes.likeButton : classes.noLikeButton}> 
              <FontAwesomeIcon icon={faThumbsUp}  onClick={(event) => handleLikes(event, review._id, 0)} />
              <span style = {{marginLeft: '3px', color: 'blue'}}>{review.likesCount} Like</span>
              </div>
              {user === review.userName && 
              <div  className={classes.deleteButton} onClick={(event) => handleDelete(event, review._id)}> 
                Delete
                <FontAwesomeIcon icon={faTrash} className={classes.deleteIcon}/>
              </div>}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className={classes.columnContainer}>
            <div className={classes.filterContainer}>
              <TextInput
                 value={filterValues.className}
                onChange={(event) => handleFilterChange('className', event.currentTarget.value)}
                placeholder="Search by Class"
              />
              <TextInput
                value={filterValues.college}
                onChange={(event) => handleFilterChange('college', event.currentTarget.value)}
                placeholder="Search by College"
              />
              <TextInput
                value={filterValues.professor}
                onChange={(event) => handleFilterChange('professor', event.currentTarget.value)}
                placeholder="Search by Professor"
              />
              <Select
                value={sortBy}
                onChange={handleSortOptionChange}
                data={[
                  { value: 'termTaken', label: 'Sort by Term Taken (Latest to Oldest)' },
                  { value: 'posttime', label: 'Sort by Post Time  (Latest to Oldest)' },
                  { value: 'likes', label: 'Sort by Number of Likes  (Most to Least)' },
                ]}
                placeholder="Sort by"
              />
              <Button
                className={classes.filterButton}
                onClick={handleFilter}>
                Filter
                </Button>
      </div>
      <div className={classes.addReviewContainer}>
              <TextInput value={newReview.className}
                onChange={(event) => handleNewReviewChange('className', event.currentTarget.value)} placeholder="Enter Class Name" />
              <TextInput  value={newReview.professor}
                onChange={(event) => handleNewReviewChange('professor', event.currentTarget.value)} placeholder="Enter Professor Name" />
              <TextInput  value={newReview.college}
                onChange={(event) => handleNewReviewChange('college', event.currentTarget.value)} placeholder="Enter College Name" />
              <span style = {{display: 'flex', flexDirection: 'row'}}>
              <Select value={newReview.termTaken} data={terms}
               onChange={handleTerms}
                 placeholder="Enter Term Taken" />
              <TextInput value={newReview.rating}
                onChange={(event) => handleNewReviewChange('rating', event.currentTarget.value)} style = {{marginLeft: '5px'}}  type="number" placeholder="Enter Rating (0-5)" />
              </span>
              <TextInput  value={newReview.reviewTitle}
                onChange={(event) => handleNewReviewChange('reviewTitle', event.currentTarget.value)}  placeholder="Enter Review Title" />
              <Textarea  value={newReview.contents}
                onChange={(event) => handleNewReviewChange('contents', event.currentTarget.value)} placeholder="Enter Review Content" />
              <Button onClick={handleAddNewReviewChange} style = {{marginTop: '7px'}}>Add Review</Button>
            </div>
      </div>
      </div>
  );
    } else {
        return (
            <div className={classes.page2}>
            <div className={classes.selectedReviewContainer}>
            <Card
          shadow="sm"
          onClose={() => {setSelectedReview(null)
          }}
          overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1]}
          className={classes.selectedReviewCard}
        >
            <div className={classes.selectedReviewInfo}>
                <p >Review by {selectedReview.userName} made on {dateTimeFormat(selectedReview.posttime)}</p>
                <p style = {{color: '#1877f2'}}>{selectedReview.className} taught by Prof. {selectedReview.professor} ({selectedReview.termTaken})</p> 
            </div>
            <div className={classes.selectedReviewTitle}>
                <h1> {selectedReview.reviewTitle} </h1>
            </div>
          <div className={classes.modalBody}>
            <div>{selectedReview.contents}</div>
          </div>
          <span style ={{display: 'flex', flexDirection: 'row', marginLeft: '2px'}}>
          <strong>Rating: {selectedReview.rating}/5    </strong>
          <Star/>
          </span>
          <div className={selectedReview.likes.includes(user) ? classes.likeButton : classes.noLikeButton} style = {{marginTop: '7px', marginLeft: '5px'}}> 
              <FontAwesomeIcon icon={faThumbsUp}  onClick={(event) => handleLikes(event, selectedReview._id, 1)} />
              <span style = {{marginLeft: '3px', color: 'blue'}}>{selectedReview.likesCount} Like</span>
          </div>
          <Button className={classes.closeButton} onClick={() => {setSelectedReview(null)
        }}>
            Close
          </Button>
        </Card>
        </div>
        </div>
        );
    }
};

export default Reviews;

