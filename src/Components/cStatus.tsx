import React from 'react';
import { Link } from 'react-router-dom';
import { Status } from '../Models'
import moment from 'moment';
import Linkify from 'react-linkify';
import '.././custom.css';
import { getUser } from '../DB'

const getUserImage = (userID: string): string => {
    const user = getUser(userID);
    if( user?.getPicture()){
        return user.getPicture()!;
    } else {
        return "https://pbs.twimg.com/profile_images/887661330832003072/Zp6rA_e2_400x400.jpg" 
    }
}

const renderStatusMessage = (msg:string) => {
    return ( msg.split(" ").map(word => {
        if(word[0] === '@'){
        return (
        <Link 
            to={`/story/${word.slice(1, word.length)}`}
            className="text-blue-500 hover:underline"
            >{word}</Link>
        )} else {
        return ` ${word} `;
        }
    })
    )
}

export const cStatus = (status: Status) => {
    return(
        <div key={status.id} className="cStatus flex border-b-2 border-gray-600  px-2 py-2 items-stretch mb-5 lg:w-1/4 sm:w-1/2  text-sm">
        <img 
            alt="meaningful text" 
            src={getUserImage(status.user_id)}
            className="w-10 h-10 rounded mr-3" />
        <div className="flex-1 overflow-hidden">
            <div>
            <span className="font-bold text-blue-500 hover:underline"> <Link to={`/story/${status.user_alias}`}>{status.user_alias}</Link></span>
                <span className="text-grey text-xs">{moment(status.created_at).format(' MMM DD')}</span>
            </div>
            <h2 key={status.id} className="text-white leading-normal">
                <Linkify>
                {renderStatusMessage(status.message)}
                </Linkify>
            </h2>
        </div>
    </div>
    )
}

