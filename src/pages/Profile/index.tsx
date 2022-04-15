import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Loading from "../../components/Loading";
import AuthContext from "../../contexts/auth";
import { UserData } from "../../interfaces/user";
import { getMentorshipsByMentor, getMentorshipsByMentored } from "../../services/mentorships";

import { getUser } from "../../services/users";
import { ProfileContainer, ProfilePage } from "./styles";

const Profile: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<UserData | undefined>(undefined);
    const { user, signOut } = useContext(AuthContext);
    const { id } = useParams<"id">();

    
    useEffect(() => {
        if(id) {
            getUser(id, (value) => {
                setCurrentUser(value);
            })

            getMentorshipsByMentor(id, (value) => {
                console.log(value)
            })

            getMentorshipsByMentored(id, (value) => {
                console.log(value)
            })
        }
    }, [id]);

    return (
        <ProfilePage>
            { currentUser && (
                <ProfileContainer>
                    <div id="profile-container">
                        <div>
                            <div id="avatar-container">
                                <Avatar />
                            </div>
                        </div>

                        <div id="info-wrapper">
                            <h1>{ currentUser?.name }</h1>
                            <p>{ currentUser?.role.name }, { currentUser?.role.seniority }</p>

                        </div>

                    </div>
                    
                    <h4 className="label">Contatos:</h4>
                    <div id="contact-wrapper">
                        <p>{ currentUser?.email }</p>
                    </div>

                    {
                        user?.id === currentUser?.id && (
                            <button onClick={() => signOut()}>Deslogar</button>
                        )
                    }

                    <h4 className="label">Habilidades:</h4>
                    <div id="skills-container">
                        <ul>
                            { currentUser?.skills.map((skill, index) => {
                                let levelStr = "";
                                for(let i = 0; i < skill.level; i++) {
                                    levelStr += "🍊"
                                }

                                return (
                                    <li key={index}>
                                        <p>{ skill.tech }</p>
                                        <p>{ levelStr }</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <h4 className="label">Horários disponíveis:</h4>
                </ProfileContainer>
            ) || (
                <Loading />
            )}
        </ProfilePage>
    )
}

export default Profile;