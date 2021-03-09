# Project Name

> Ingenuity

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Dependencies](#Dependencies)
1. [Requirements](#requirements)
1. [Usage](#Usage)
1. [Development](#development)

## Dependencies

From within the root directory:

```sh
npm install
```

Installs faker.js and mongoose.

## Requirements

> Ensure Mongo is running

## Usage
This repo contains (for each table) data generators (in ./generators), generated data (in ./data), db schemas (in ./db/schemas), and db inserters.

To generate data for each of the tables:

1. In the terminal, navigate to FECdbSeed/generators.

1. Run node imagesGenerator.js

1. Run node instructorsGenerator.js

1. Run node offeredBysGenerator.js

1. Run node syllabusesGenerator.js

1. Run node testimonialsGenerator.js

Ensure data has been generated properly.  When you are ready to insert your data to their respective databases/tables:

1. In the terminal, navigate to FECdbSeed/db/inserters

1. Run node imagesInserter.js

1. Run node instructorsInserter.js

1. Run node offeredBysInserter.js

1. Run node syllabusesInserter.js

1. Run node testimonialsInserter.js

> images database should contain images table
>
> syllabuses database should contain syllabuses table
>
> instructors database should contains instructors, offeredBys, and testimonials tables (all one service)



## Development

