// Celebrity dataset mapping service
export interface CelebrityData {
  image: string;
  text: string;
  audio: string;
}

export interface CelebrityDataset {
  [emotion: string]: {
    [celebrity: string]: CelebrityData;
  };
}

// Import the dataset from the Python file structure
export const CELEBRITY_DATASET: CelebrityDataset = {
  "sad": {
    "dharmajan": {
      "image": "https://ui-avatars.com/api/?name=dharmajan&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "patuillel venda!, bowl cheyyanpattuo? keeping?....out!",
      "audio": "https://drive.google.com/uc?export=download&id=1lrfRacudqBGuIIGBjAGpIOzPSz77hvpN"
    },
    "dileep": {
      "image": "https://ui-avatars.com/api/?name=dileep&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "it's okay , it's okay , leave it baby, leave it",
      "audio": "https://drive.google.com/uc?export=download&id=1iUx8jFH39xz2Aig_ROG0W7LzV-fDaLkq"
    }
  },
  "confident": {
    "lalualex": {
      "image": "https://ui-avatars.com/api/?name=lalualex&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "enthoru elima! enthoru vinayam!",
      "audio": "https://drive.google.com/uc?export=download&id=1cHwpZEHmUtCEac6QUe6oNAUSsmmFbiAn"
    }
  },
  "story": {
    "lalstory": {
      "image": "https://ui-avatars.com/api/?name=lalstory&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "Koonamthuruthil parapparambil narayanan makan sathyanarayanan....",
      "audio": "https://drive.google.com/uc?export=download&id=1c--8tTmbuy7UXQKgIr804zEgqQ2Jd3oq"
    }
  },
  "humorous": {
    "jayaram": {
      "image": "https://ui-avatars.com/api/?name=jayaram&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "hehehhehehee, enikk vayya ivante oru kaaryam",
      "audio": "https://drive.google.com/uc?export=download&id=1nHEv2oCW0MW8nCtxS7TjGvp4F26xKem0"
    }
  },
  "curious": {
    "vinayakan": {
      "image": "https://ui-avatars.com/api/?name=vinayakan&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "yes tell me, ask me samshayam ennum nallath aanu",
      "audio": "https://drive.google.com/uc?export=download&id=1zWQmM9Xk6OSl9WeCOuk5-pkIu1XdVH7M"
    }
  },
  "greeting": {
    "georgesar": {
      "image": "https://ui-avatars.com/api/?name=georgesar&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "helloooo",
      "audio": "https://drive.google.com/uc?export=download&id=1wwRDYJIKtO9QMDuw7lmYD6gHqYjlwBw3"
    },
    "rimitomi": {
      "image": "https://ui-avatars.com/api/?name=rimitomi&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "hehehee",
      "audio": "https://drive.google.com/uc?export=download&id=1idkhivNJ7kkFZfzXT0BanFQkpLl-wJ2k"
    }
  },
  "insult": {
    "georgesar": {
      "image": "https://ui-avatars.com/api/?name=georgesar&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "Eda ego thalekkakath aakanam , ath ee samayath vayikkakath kutthi kettan nokkalle!",
      "audio": "https://drive.google.com/uc?export=download&id=12bCg4fWg0HyyzBpYvUkYuLbI8NRb4_rs"
    }
  },
  "romantic": {
    "nivin": {
      "image": "https://ui-avatars.com/api/?name=nivin&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "Nalla thanutha kaat und alle",
      "audio": "https://drive.google.com/uc?export=download&id=1dfH8kp2sRoePogAPXkVGpI3XXON6F-cP"
    }
  },
  "confused": {
    "prithviraj": {
      "image": "https://ui-avatars.com/api/?name=prithviraj&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "Fantastik..but...",
      "audio": "https://drive.google.com/uc?export=download&id=1bSCv_ZgTMyIIwuy-N1MzGsN3t2w5bLOs"
    },
    "suraj": {
      "image": "https://ui-avatars.com/api/?name=suraj&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "njaano , poodaa",
      "audio": "https://drive.google.com/uc?export=download&id=1pxIjiT9o_wU7U-wTCRiUYGNwRU936aDn"
    },
    "chembanvinod": {
      "image": "https://ui-avatars.com/api/?name=chembanvinod&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "ivane sookshikkanam , ivan nammale kozhappikan ulla parupadi , ivan ithil entho kaiyund!",
      "audio": "https://drive.google.com/uc?export=download&id=11utDDVdpW9XuHhvbgi_OO5OjXEQS7jb8"
    },
    "dileep": {
      "image": "https://ui-avatars.com/api/?name=dileep&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "haa yes ofcourse , nn orkunnu , vallathe orkunnu",
      "audio": "https://drive.google.com/uc?export=download&id=11IiB4275_xdF3GbK7s6lS6UJ_ShEeOPc"
    }
  },
  "angry": {
    "suraj": {
      "image": "https://ui-avatars.com/api/?name=suraj&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "dhairyam undenkil erangi vaada , illenkil njan angot varam",
      "audio": "https://drive.google.com/uc?export=download&id=18pKsXZQVz2_i_nOgvbjWLSCMzc0RbyOG"
    }
  },
  "casual": {
    "suraj": {
      "image": "https://ui-avatars.com/api/?name=suraj&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "da budhijeevi da, knaapa  daa!",
      "audio": "https://drive.google.com/uc?export=download&id=1vKeLleyU-JQPGWk5YlTgOeHviOHelSe4"
    },
    "dileep": {
      "image": "https://ui-avatars.com/api/?name=dileep&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "ho my goodness",
      "audio": "https://drive.google.com/uc?export=download&id=1RtWxXMNdqiBY61UmrEmlY67iTT5S-893"
    }
  },
  "encouraging": {
    "dileep": {
      "image": "https://ui-avatars.com/api/?name=dileep&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "hehe thats my pleasure :)",
      "audio": "https://drive.google.com/uc?export=download&id=1yxSWNlPqjfbaJkc3sp-GsR9iReySzTzq"
    }
  },
  "neutral": {
    "dileep": {
      "image": "https://ui-avatars.com/api/?name=dileep&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "ninne okke vitta cash ent kaiyil undeda",
      "audio": "https://drive.google.com/uc?export=download&id=1BIBWjDZAZ2Rc9LKiW-vbxXmlAqrXOU1X"
    }
  },
  "surprised": {
    "dileep": {
      "image": "https://ui-avatars.com/api/?name=dileep&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "you said it , you said it  angel, exactly!",
      "audio": "https://drive.google.com/uc?export=download&id=1s5rdNzmM3NSL89DCFsRLf6Iy0htmK7GW"
    }
  },
  "frustrated": {
    "dileep": {
      "image": "https://ui-avatars.com/api/?name=dileep&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "yes sir, what sir, get lost!",
      "audio": "https://drive.google.com/uc?export=download&id=1X4ZBxscBYNeoiHKMZbxhBosy89mmIEal"
    }
  },
  "bye": {
    "mohanlal": {
      "image": "https://ui-avatars.com/api/?name=mohanlal&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "linecut ! linecut!",
      "audio": "https://drive.google.com/uc?export=download&id=18ny8fdVBs07LH1brPDiwKVozEhv8M0YK"
    }
  },
  "scared": {
    "suraj": {
      "image": "https://ui-avatars.com/api/?name=suraj&background=random&color=fff&size=128&rounded=true&bold=true",
      "text": "ingane pedikalle da!",
      "audio": "https://drive.google.com/uc?export=download&id=1s9Nwkpp08gbOIbj6t8A8MPrtRfZX_lyG"
    }
  }
};

export interface CelebrityResponse {
  celebrity: string;
  emotion: string;
  text: string;
  image: string;
  audio: string;
}

/**
 * Get a random celebrity response for a given emotion
 */
export function getCelebrityResponse(emotion: string): CelebrityResponse | null {
  const emotionData = CELEBRITY_DATASET[emotion.toLowerCase()];
  
  if (!emotionData) {
    console.warn(`No celebrity data found for emotion: ${emotion}`);
    return null;
  }

  // Get all celebrities for this emotion
  const celebrities = Object.keys(emotionData);
  
  // Pick a random celebrity
  const randomCelebrity = celebrities[Math.floor(Math.random() * celebrities.length)];
  const celebrityData = emotionData[randomCelebrity];

  return {
    celebrity: randomCelebrity,
    emotion: emotion,
    text: celebrityData.text,
    image: celebrityData.image,
    audio: celebrityData.audio
  };
}

/**
 * Get all available emotions in the dataset
 */
export function getAvailableEmotions(): string[] {
  return Object.keys(CELEBRITY_DATASET);
}