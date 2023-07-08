import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";

function Department(props) {
  const [members, setMembers] = useState([]);

  const getMembers = async () => {
    const response = await axios.get(
      `${process.env.PUBLIC_URL}/DB/members.json`
    );
    await setMembers(response.data.members);
  };

  useEffect(() => {
    try {
      getMembers();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Layout name={"Department"}>
      {members.map((member, index) => (
        <MemberProfile
          key={`${member?.name}_${index}`}
          member={member}
          index={index}
        />
      ))}
    </Layout>
  );
}

function MemberProfile({ member, index }) {
  if (member == undefined) return null;

  return (
    <article>
      <div className="pic">
        <img
          src={`${process.env.PUBLIC_URL}/img/${member.pic}`}
          alt={member.name}
        />
      </div>
      <h2>{member.name}</h2>
      <p>{member.position}</p>
    </article>
  );
}

export default Department;
