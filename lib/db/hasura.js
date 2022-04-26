const operationsDoc1 = `
  mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    insert_stats_one(object: {favourited: $favourited, userId: $userId, watched: $watched, videoId: $videoId}) {
      favourited
      id
      userId
    }
  }
`;

export async function updateStats(
  token,
  { favourited, watched, userId, videoId }
) {
  const operationsDoc = `
  mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    update_stats_(
      _set: {watched: $watched}, 
      where: {
        userId: {_eq: $userId}, 
        videoId: {_eq: $videoId}
      }) {
      favourited
      watched
      userId
      videoId
    }
  }
`;
  const response = await queryHasuraGraphQL(
    operationsDoc,
    "updateStats",
    { favourited, watched, userId, videoId },
    token
  );

  return response;
}

export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      userId
      favourited
      videoId
      watched
    }
  }
`;
  const response = await queryHasuraGraphQL(
    operationsDoc,
    "findVideoIdByUserId",
    { videoId, userId },
    token
  );

  return response?.data?.stats?.length > 0;
}

export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress } = metadata;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "createNewUser",
    { issuer, email, publicAddress },
    token
  );

  console.log({ response, issuer });
  return response?.data?.users?.length === 0;
}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
    }
  }
`;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );

  console.log({ response, issuer });
  return response;
}

async function queryHasuraGraphQL(
  operationsDoc,
  operationName,
  variables,
  token
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}
