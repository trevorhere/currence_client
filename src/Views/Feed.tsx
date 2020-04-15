import React, { useContext, useState, useEffect} from 'react';
import { authContext } from '../Context/authContext';
import FeedService from '../Services/Feed'
import StatusBox  from './Components/StatusBox'
import  ProfileBox  from './Components/ProfileBox'
import { Status, User } from '../Models';
import styled from 'styled-components';
import '../custom.css'


const Feed: React.FC = () => {

  const {authenticationToken, setAuthenticationToken } = useContext(authContext);
  const [newStatusMessage, setNewStatusMessage] = useState<string>('');
  const [feed, setFeed] = useState< {}[] | null >(null);
  const [statusCount, setstatusCount] = useState<number>(9);
  const [loading, setLoading] = useState<boolean | null>(false);
  const [feedUser, setFeedUser] = useState<User|null>(null);
  const [feedService, setFeedService] = useState<FeedService>(new FeedService(setAuthenticationToken));
  const {token, alias} = authenticationToken!
  
  const handleAddStatus = (): void   => {  
    feedService.createStatus(alias!, newStatusMessage, token!).then(res => {
      setNewStatusMessage('');
    })
  } 

  const validStatusLength = ():boolean => {
    return newStatusMessage.split('').length > 128
    ? true
    : false
  }

  const reBuildFeed = () => {
    feedService.getFeed(alias!, statusCount, token).then(res => {
      setLoading(true);
      if(res){
        setFeed([...feed!].concat(res!.feed));
        setFeedUser(res!.user)
      } else {
        alert('all outta status updates')
      }
      setLoading(false);
    })
  }

  const renderFeed = () => {
      if(feed != null){
        return feed.map(status => {
          return (
            StatusBox(status)
          )}
        )} 
        else {
          return <p>Loading</p>
        }
    }
  
  useEffect(() => {
    feedService.getFeed(alias!, statusCount, token).then(res => {
      setLoading(true);
      if(res){
        setFeed(res!.feed);
        setFeedUser(res!.user)
      } else {
        alert('all outta status updates')
      }
      setLoading(false);

    })
  }, [alias, statusCount, token, feedService])

  return (
    <div>
      { 
      loading ? 
      <div> Loading </div> : 
      <div className="flex pt-32 flex-col items-center content-center justify-center mb-10 text-white text-xl">
      <div className=" w-1/4 ">
      <div className=" w-full flex-row">
        <div>
          <ProfileBox  
          ownerAlias = {alias!}
          owner={feedUser!}
          /> 
        </div>
        <StatusContainer 
          className={
            validStatusLength() 
            ?   `border border-red-500`
            :   `border border-grey-500`
          }
        >
          <StatusField
            id="status" 
            value={newStatusMessage}
            type="text" 
            placeholder="status"
            onChange={(e) => { 
              setNewStatusMessage(e.target.value)
            }}
          />
          <div style={{marginLeft: 'auto'}}>
          <button 
            className={
              `text-sm text-white py-1 px-2 mx-2 my-2  rounded  
              ${validStatusLength() 
                ? `bg-red-700 hover:bg-red-700 cursor-not-allowed`
                : `hover:bg-blue-400 bg-blue-700`}
              `}
            type="button"
            onClick={() =>  {
              validStatusLength()
              ? console.log('status too long')
              : handleAddStatus()
            }}
            >{validStatusLength() 
              ? `Status too long`
              : `Submit`}
          </button>
          </div>
        </ StatusContainer>
    </div>
    {renderFeed()}
    </div>
    <button 
        className="hover:bg-blue-700 border text-sm text-blue-500 py-1 px-2 mb-5  rounded focus:outline-none focus:shadow-outline" 
        type="button"
        onClick={() =>  { 
              reBuildFeed();
            }} >
          more
      </button>
    </div>
    }
    </div>
);
}

export default Feed;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: .25rem;
  border-radius: .25rem;
  align-items: end;
  margin-bottom: 1.5rem;
`
const StatusField = styled.textarea`
  resize: none; 
  background-color: #1A202D;
  padding: .25rem;
  color: white;
  height: 5rem;
  width: 100%;
  font-size: 1rem;
  &:focus {
    outline:none!important;
  }
`