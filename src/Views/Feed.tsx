import React, { useContext, useState, useEffect} from 'react';
import { authContext } from '../Context/authContext';
import { buildFeed, createStatus } from '../Services/Feed'
import {Status } from '../Models'
import StatusBox  from './Components/StatusBox'
import  ProfileBox  from './Components/ProfileBox'
import styled from 'styled-components';
import '../custom.css'

const Feed: React.FC = () => {
  const { authenticatedUserID } = useContext(authContext);
  const [feed, setFeed] = useState< Status[] | null >(null);
  const [newStatusMessage, setNewStatusMessage] = useState<string>('');
  const [statusCount, setstatusCount] = useState<number>(9);

    
  const handleAddStatus = (): void   => {  
    createStatus(authenticatedUserID!, newStatusMessage).then(res => {
      setNewStatusMessage('');
      buildFeed(authenticatedUserID!, statusCount).then(res => {
        setFeed(res);
      })
    })

  } 

  const validStatusLength = ():boolean => {
    return newStatusMessage.split('').length > 128
    ? true
    : false
  }

  const reBuildFeed = () => {
    buildFeed(authenticatedUserID!, statusCount).then(res => {
      setFeed(res);
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
          return <p>feed not found</p>
        }
    }
  
  useEffect(() => {
    buildFeed(authenticatedUserID!, statusCount).then(res => {
      setFeed(res);
    })
  }, [authenticatedUserID, statusCount])

  return (
    <div className="flex pt-32 flex-col items-center content-center justify-center mb-10 text-white text-xl">
        <div className=" w-1/4 ">
        <div className=" w-full flex-row">
            <div>
              < ProfileBox  
              storyOwnerID = {authenticatedUserID!}
              authenticatedUserID = {authenticatedUserID!}
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
                className={``}
              
                value={newStatusMessage}
                type="text" 
                placeholder="status"
                onChange={(e) => {setNewStatusMessage(e.target.value)}}
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
                let currentCount = statusCount + 10;
                console.log('cc: ', currentCount)

                setstatusCount(currentCount);
                console.log('sc: ', statusCount)
                reBuildFeed();
              }} >
            more
        </button>
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