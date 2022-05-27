import { useQuery, gql } from "@apollo/client";

const Me = gql`
  query {
    me {
      _id
      name
      username
      email
    }
  }
`;

const SCHEDULE_QUERY = gql`
  query {
    schedules {
      _id
      title
      userId
      code
    }
  }
`;

const QueryMultiple = () => {
  const res1 = useQuery(Me);
  const res2 = useQuery(SCHEDULE_QUERY);
  return [res1, res2];
};

export default QueryMultiple;
