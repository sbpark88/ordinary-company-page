import Layout from "../components/layout/Layout";
import $K from "../modules/data/Constants";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { getMembers } from "../modules/api/Members";
import { setMembers } from "../redux/action";
import { toastDefaultApiError } from "../modules/utils/UiHelper";
function Department() {
  const members = useSelector((store) => store.memberReducer.members);
  const dispatch = useDispatch();

  const getMemberList = useCallback(async () => {
    try {
      const resposne = await getMembers();
      dispatch(setMembers(resposne.members));
    } catch (e) {
      toastDefaultApiError();
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      getMemberList();
    } catch (e) {
      console.error(e);
    }
  }, [getMemberList]);

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
