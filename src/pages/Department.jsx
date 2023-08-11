import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import $K from "../modules/data/Constants";
import { getMembers } from "../modules/api/Members";
import { toastDefaultApiError } from "../modules/utils/UiHelper";
function Department() {
  const [members, setMembers] = useState([]);

  const getMemberList = async () => {
    try {
      const response = await getMembers();
      setMembers(response.members);
    } catch (e) {
      toastDefaultApiError();
    }
  };

  useEffect(() => {
    try {
      getMemberList();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Layout
      name={"Department"}
      backgroundImageUrl={`${$K.PUBLIC_URL}/img/Department.jpg`}
    >
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

function MemberProfile({ member }) {
  if (member === undefined) return null;

  return (
    <article>
      <div className="pic">
        <img src={`${$K.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
        <img src={`${$K.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
      </div>
      <h2>{member.name}</h2>
      <p>{member.position}</p>
    </article>
  );
}

export default Department;
