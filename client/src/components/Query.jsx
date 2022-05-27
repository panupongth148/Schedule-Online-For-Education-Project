import { useQuery, gql } from "@apollo/client";

const ME = gql`
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
  const res1 = useQuery(ME);
  const res2 = useQuery(SCHEDULE_QUERY);
  return [res1, res2];
};

export default QueryMultiple;
