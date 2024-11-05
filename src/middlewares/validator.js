const REQUIRED_FIELDS = ["title", "description"];
const METHODS_TO_VALIDATE = ["PUT", "POST"];

const checkField = {
  title: (value, errors) => {
    if (!!Number.parseInt(value)) {
      errors.title.push(`field needs to be a string`);
    }
    if (value.length < 3) {
      errors.title.push(`field needs to have more than 3 characters`);
    }
    if (value.length > 30) {
      errors.title.push(`field needs to have less than 30 characters`);
    }
    return errors;
  },
  description: (value, errors) => {
    if (!!Number.parseInt(value)) {
      errors.description.push(`field needs to be a string`);
    }

    if (value.length < 3) {
      errors.description.push(`field needs to have more than 3 characters`);
    }
    if (value.length > 100) {
      errors.description.push(`field needs to have less than 100 characters`);
    }
    return errors;
  },
};

function parse(body) {
  let errors = {
    title: [],
    description: [],
  };
  const reqBody = { ...body };

  try {
    const reqFields = Object.keys(body);

    // Checando se os campos existem
    const missingFields = REQUIRED_FIELDS.filter(
      (field) => !reqFields.includes(field)
    );
    if (missingFields.length > 0) {
      for (const field of missingFields) {
        errors[field].push(`field is required`);
      }
    }

    // Valida os campos e remove os campos indesejados
    for (const field of reqFields) {
      if (!REQUIRED_FIELDS.includes(field)) {
        delete reqBody[field];
      } else {
        errors = checkField[field](reqBody[field], errors);
      }
    }
    return {
      body: reqBody,
      hasError: Object.keys(errors).some((field) => errors[field].length > 0),
      errors,
    };
  } catch (e) {
    return {
      body: {},
      hasError: true,
      errors: { message: "invalid data" },
    };
  }
}

export function validate(req, res) {
  if (!METHODS_TO_VALIDATE.includes(req.method)) return;

  const { hasError, errors, body } = parse(req.body);
  if (hasError) {
    return res.writeHead(400).end(JSON.stringify(errors));
  }

  req.body = body;
}
