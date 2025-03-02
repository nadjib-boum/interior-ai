import bcrypt from "bcryptjs";

class HashUtil {

  async hash (str: string) {

    const salt = await bcrypt.genSalt (10);

    const hash = await bcrypt.hash (str, salt);

    return hash;

  }

  async isHashValid (str: string, hashed: string) {

    return await bcrypt.compare (str, hashed);

  }

}

const hashUtil = new HashUtil ();

export default hashUtil;
