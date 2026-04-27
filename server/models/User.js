import { query } from "../config/database.js";

/* =====================================
   COMMON QUERY RUNNER
===================================== */
const runQuery = (executor, text, params = []) =>
  executor
    ? executor.query(text, params)
    : query(text, params);

/* =====================================
   MAP USER DATA
===================================== */
const mapUser = (
  row,
  { includePassword = false } = {}
) => {
  if (!row) return null;

  const user = {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    profilePictureUrl:
      row.profile_picture_url,
    role: row.role,
    status: row.status,
    emailVerified:
      row.email_verified,
    phoneVerified:
      row.phone_verified,
    lastLogin: row.last_login,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt:
      row.deleted_at || null
  };

  if (includePassword) {
    user.passwordHash =
      row.password_hash;
  }

  return user;
};

/* =====================================
   FIND BY ID
===================================== */
const findById = async (
  id,
  {
    includePassword = false,
    executor = null
  } = {}
) => {
  try {
    const result = await runQuery(
      executor,
      `
      SELECT *
      FROM users
      WHERE id = $1
      LIMIT 1
      `,
      [id]
    );

    return mapUser(
      result.rows[0],
      { includePassword }
    );
  } catch (error) {
    console.log(
      "findById ERROR:",
      error
    );
    throw error;
  }
};

/* =====================================
   FIND BY EMAIL
===================================== */
const findByEmail = async (
  email,
  {
    includePassword = false,
    executor = null
  } = {}
) => {
  try {
    const result = await runQuery(
      executor,
      `
      SELECT *
      FROM users
      WHERE LOWER(email)=LOWER($1)
      LIMIT 1
      `,
      [email]
    );

    return mapUser(
      result.rows[0],
      { includePassword }
    );
  } catch (error) {
    console.log(
      "findByEmail ERROR:",
      error
    );
    throw error;
  }
};

/* =====================================
   CREATE USER
===================================== */
const create = async (
  {
    fullName,
    email,
    phone,
    passwordHash,
    role = "customer"
  },
  executor = null
) => {
  try {
    const result = await runQuery(
      executor,
      `
      INSERT INTO users (
        full_name,
        email,
        phone,
        password_hash,
        role,
        status
      )
      VALUES (
        $1,$2,$3,$4,$5,'active'
      )
      RETURNING *
      `,
      [
        fullName,
        email,
        phone || null,
        passwordHash,
        role
      ]
    );

    return mapUser(
      result.rows[0]
    );
  } catch (error) {
    console.log(
      "CREATE USER ERROR:",
      error
    );
    throw error;
  }
};

/* =====================================
   UPDATE PROFILE
===================================== */
const updateProfile = async (
  id,
  updates,
  executor = null
) => {
  try {
    const fields = [];
    const values = [id];
    let index = 2;

    if (
      typeof updates.fullName !==
      "undefined"
    ) {
      fields.push(
        `full_name = $${index}`
      );
      values.push(
        updates.fullName
      );
      index++;
    }

    if (
      typeof updates.phone !==
      "undefined"
    ) {
      fields.push(
        `phone = $${index}`
      );
      values.push(
        updates.phone || null
      );
      index++;
    }

    if (
      typeof updates.profilePictureUrl !==
      "undefined"
    ) {
      fields.push(
        `profile_picture_url = $${index}`
      );
      values.push(
        updates.profilePictureUrl ||
          null
      );
      index++;
    }

    if (!fields.length) {
      return findById(id);
    }

    fields.push(
      `updated_at = CURRENT_TIMESTAMP`
    );

    const result = await runQuery(
      executor,
      `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $1
      RETURNING *
      `,
      values
    );

    return mapUser(
      result.rows[0]
    );
  } catch (error) {
    console.log(
      "UPDATE PROFILE ERROR:",
      error
    );
    throw error;
  }
};

/* =====================================
   UPDATE PASSWORD
===================================== */
const updatePassword =
  async (
    id,
    passwordHash,
    executor = null
  ) => {
    try {
      const result =
        await runQuery(
          executor,
          `
        UPDATE users
        SET
          password_hash = $2,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
        `,
          [
            id,
            passwordHash
          ]
        );

      return mapUser(
        result.rows[0]
      );
    } catch (error) {
      console.log(
        "UPDATE PASSWORD ERROR:",
        error
      );
      throw error;
    }
  };

/* =====================================
   UPDATE LAST LOGIN
===================================== */
const updateLastLogin =
  async (
    id,
    executor = null
  ) => {
    try {
      const result =
        await runQuery(
          executor,
          `
        UPDATE users
        SET last_login = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
        `,
          [id]
        );

      return mapUser(
        result.rows[0]
      );
    } catch (error) {
      console.log(
        "LAST LOGIN ERROR:",
        error
      );
      throw error;
    }
  };

/* =====================================
   USER LIST
===================================== */
const list = async ({
  search,
  role,
  status,
  page = 1,
  limit = 10
} = {}) => {
  try {
    const filters = ["1=1"];
    const params = [];

    if (search) {
      params.push(
        `%${search.trim()}%`
      );
      filters.push(`
        (
          full_name ILIKE $${params.length}
          OR email ILIKE $${params.length}
          OR COALESCE(phone,'') ILIKE $${params.length}
        )
      `);
    }

    if (role) {
      params.push(role);
      filters.push(
        `role = $${params.length}`
      );
    }

    if (status) {
      params.push(status);
      filters.push(
        `status = $${params.length}`
      );
    }

    const whereClause = `WHERE ${filters.join(
      " AND "
    )}`;

    const safePage =
      Math.max(
        Number(page) || 1,
        1
      );

    const safeLimit =
      Math.min(
        Math.max(
          Number(limit) || 10,
          1
        ),
        100
      );

    const offset =
      (safePage - 1) *
      safeLimit;

    const countResult =
      await query(
        `
      SELECT COUNT(*)::int AS total
      FROM users
      ${whereClause}
      `,
        params
      );

    const dataResult =
      await query(
        `
      SELECT *
      FROM users
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${
        params.length + 1
      }
      OFFSET $${
        params.length + 2
      }
      `,
        [
          ...params,
          safeLimit,
          offset
        ]
      );

    return {
      users:
        dataResult.rows.map(
          (row) =>
            mapUser(row)
        ),
      total:
        countResult.rows[0]
          .total,
      page: safePage,
      limit: safeLimit
    };
  } catch (error) {
    console.log(
      "USER LIST ERROR:",
      error
    );
    throw error;
  }
};

/* =====================================
   ADMIN UPDATE
===================================== */
const updateByAdmin =
  async (
    id,
    updates,
    executor = null
  ) => {
    try {
      const fields = [];
      const values = [id];
      let index = 2;

      for (const key in updates) {
        if (
          updates[key] !==
          undefined
        ) {
          let column = key;

          if (
            key === "fullName"
          )
            column =
              "full_name";

          fields.push(
            `${column} = $${index}`
          );

          values.push(
            updates[key]
          );
          index++;
        }
      }

      if (!fields.length)
        return findById(id);

      fields.push(
        `updated_at = CURRENT_TIMESTAMP`
      );

      const result =
        await runQuery(
          executor,
          `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id = $1
        RETURNING *
        `,
          values
        );

      return mapUser(
        result.rows[0]
      );
    } catch (error) {
      console.log(
        "ADMIN UPDATE ERROR:",
        error
      );
      throw error;
    }
  };

/* =====================================
   DELETE USER
===================================== */
const softDelete =
  async (
    id,
    executor = null
  ) => {
    try {
      const result =
        await runQuery(
          executor,
          `
        DELETE FROM users
        WHERE id = $1
        RETURNING *
        `,
          [id]
        );

      return mapUser(
        result.rows[0]
      );
    } catch (error) {
      console.log(
        "DELETE ERROR:",
        error
      );
      throw error;
    }
  };

const User = {
  mapUser,
  findById,
  findByEmail,
  create,
  updateProfile,
  updatePassword,
  updateLastLogin,
  list,
  updateByAdmin,
  softDelete
};

export default User;