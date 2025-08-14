import { formatDate } from "../Utils/formatDate";
import {useEffect, useState} from "react"
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import {useContext} from "react"
import { UserContext } from "../Contexts/UserContext";


export default function Homepage(){
    const {user} = useContext(UserContext)
    return (
        <main className="container">
            <h2>Welcome to NC News{user?.username ? `, ${user.username}` : ""} </h2>
            <p>A one stop shop of all the latest random articles submitted to our DB.  Like, vote and comment!</p>
        </main>
    )

}