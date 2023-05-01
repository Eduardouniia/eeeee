import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Permission,
  Query,
  Role,
  Storage,
  Teams,
  Functions,
  Locale,
} from "appwrite";
import React, { createContext, useContext } from "react";
import "url-search-params-polyfill";
import io from "socket.io-client";
import {
  CONFIGS_COLLECTION_ID,
  DATABASE_ID,
  INVITATION_CALLBACK_URL,
  OAUTH_CALLBACK_URL,
  PROJECT_ENDPOINT,
  PROJECT_ID,
  SERVICOS_COLLECTION_ID,
  TOKENS_COLLECTION_ID,
  apiKey,
  appTZ,
  fetcher,
  localTZ,
  take,
} from "./default";
const ServerContext = createContext(null);
const client = new Client();
const avatars = new Avatars(client);
client.setEndpoint(PROJECT_ENDPOINT).setProject(PROJECT_ID);
const account = new Account(client);
const teams = new Teams(client);
const storage = new Storage(client);
const databases = new Databases(client);
const Permissions = Permission;
const Roles = Role;
const id = ID;
const functions = new Functions(client);
const locale = new Locale(client);
const ServerProvider = ({ children }) => {
  const [real, setReal] = React.useState(null);

  const loginUsingGoogle = () => {
    _loginUsingOAuthProvider("google");
  };

  const loginUsingCredentials = async (email, password) => {
    return await account.createEmailSession(email, password);
  };

  const getAccount = async () => {
    return await account.get();
  };

  const createMembership = async (email, teamId) => {
    teams.createMembership("user", [], "http://localhost:3000");
  };

  const logout = async () => {
    try {
      const response = await account.deleteSessions();

      console.warn(response);
    } catch (error) {
      console.error(error);
    }
  };

  const loginAnonymously = async () => {
    return await account.createAnonymousSession();
  };

  const updateEmail = async (email, password) => {
    return await account.updateEmail(email, password);
  };

  const updateUserPrefs = async (prefs) => {
    const existingPrefs = await account.getPrefs();
    return account.updatePrefs({ ...existingPrefs, ...prefs });
  };
  const getServicoList = async (filters, limit, offset) => {
    return databases.listDocuments(SERVICOS_COLLECTION_ID, filters);
  };

  const createServico = async (data, user_id) => {
    const servico = await databases.createDocument(
      "freteme",
      "servicos",
      id.unique(),
      data,
      [Permission.write(Role.user(user_id))]
    );
    return servico;
  };
  const RealTimeSubscription = () => {
    client.subscribe(
      "databases.freteme.collections.servicos",
      (response) => {}
    );
  };

  const ceateFunction = async () => {
    const promise = functions.createExecution("socket");
    return promise;
  };
  const getServico = async (jobId) => {
    return databases.getDocument("freteme", "servicos", jobId);
  };

  const getServices = (id, callback, limit) => {
    databases
      .listDocuments("freteme", "servicos", [
        Query.notEqual("status", "finalizado"),
        Query.equal("user_id", `${id}`),
        Query.limit(limit || 1),
      ])
      .then((response) => {
        callback(null, response.documents);
      })
      .catch((error) => {
        callback(error);
      });
  };

  const updateServicoStatus = async (id, status) => {
    const response = databases.updateDocument("freteme", "servicos", id, {
      status: status,
    });

    response.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const deleteServico = async (jobId) => {
    await databases.deleteDocument(SERVICOS_COLLECTION_ID, jobId);
  };
  const getConfig = async () => {
    return databases.listDocuments("freteme", "config");
  };
  const getAvatar = () => {
    const response = avatars.getInitials();
    return response;
  };
  const realTime = () => {
    const socket = io.connect("https://socket.freteme.com");
    socket.emit("servicos", {
      data: `freteme, servicos`,
      function: databases.listDocuments,
    });
    socket.on("update", async (update) => {
      setReal(update);
    });
    socket.on("response", async (response) => {});
    socket.on("connect", () => {});
    return socket;
  };
  const updateAccount = async (data) => {
    if (data) {
      if (data.name) {
        account.updateName(data.name);
      }
      if (data.phone) {
        account.updatePhone(data.phone, data.password);
      }
      if (data.password) {
        account.updatePassword(data.password);
      }
    }
  };
  const updateName = async (name) => {
    try {
      const response = await account.updateName(`${name}`);
      return response;
    } catch (error) {
      throw error;
    }
  };
  async function handleToken(user_id, role, token) {
    const data = {
      user_id: user_id,
      role: role,
      token: token,
    };
    try {
      const response = await databases.createDocument(
        "freteme",
        "token",
        user_id,
        data,

        [Permission.write(Role.user(user_id))]
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const updatePreferences = async (data) => {
    const response = account.updatePrefs({
      documents: data.documents,
      role: data.role,
      veiculo: data.veiculo,
    });

    response.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
    return response;
  };
  return (
    <ServerContext.Provider
      value={{
        account,
        teams,
        storage,
        databases,
        Permissions,
        Roles,
        Account,
        Teams,
        Storage,
        Databases,
        Permission,
        Role,
        updateAccount,
        loginUsingGoogle,
        loginUsingCredentials,
        getAccount,
        createMembership,
        logout,
        loginAnonymously,
        updateEmail,
        updateUserPrefs,
        PROJECT_ENDPOINT,
        CONFIGS_COLLECTION_ID,
        DATABASE_ID,
        INVITATION_CALLBACK_URL,
        OAUTH_CALLBACK_URL,
        PROJECT_ID,
        SERVICOS_COLLECTION_ID,
        TOKENS_COLLECTION_ID,
        apiKey,
        appTZ,
        fetcher,
        localTZ,
        take,
        getServicoList,
        createServico,
        getServico,
        updateServicoStatus,
        deleteServico,
        getConfig,
        RealTimeSubscription,
        getAvatar,
        getServices,
        realTime,
        real,
        ceateFunction,
        updateName,
        handleToken,
        updatePreferences,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = () => useContext(ServerContext);
export default ServerProvider;
