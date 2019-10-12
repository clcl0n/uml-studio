FROM node:lts-slim

RUN apt-get update

RUN apt-get install -y zsh

RUN apt-get install -y git

RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

CMD ["zsh"]