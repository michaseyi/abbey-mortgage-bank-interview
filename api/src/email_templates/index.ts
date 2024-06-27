import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

const templates = {
  verifyEmailSignIn: handlebars.compile(
    fs
      .readFileSync(path.join(__dirname, 'verify_email_signin.html'))
      .toString(),
  ),
};

export default templates;
