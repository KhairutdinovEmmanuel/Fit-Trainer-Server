export interface IPayloadMessage {
    logo: string;
    link: string;
    title: string;
    description: string;
    confirmCode: number;
    supDescriptionLink: string;
}

export const getMessageForSendToMail = ({ title, description, logo, supDescriptionLink, link, confirmCode }: IPayloadMessage) => `
    <div style="width: 100%; display: flex; justify-content: center" >
    <div style="width: fit-content;" >
        <div style="display: flex; padding: 10px; border-bottom: 1px solid #ccc;" >
            <img 
                width="42"
                height="42"
                loading="lazy"
                style="object-fit: contain;"
                alt="Logo fit-trainer"
                src="${logo}" 
            />
            <span style="display: block; margin: 5px; font-size: 24px;" >
                ${title}
            </span>
        </div>
        <div style="padding: 10px;" >
            <p>
                ${description} 
            </p>
            <p>
                <span>${supDescriptionLink}</span>
                <a href="${link}">${link}</a>
            </p>
            <p>
                <span>Confirm code: ${confirmCode}</span>
            </p>
        </div>
        <div style="display: flex;" >
            <div style="display: flex; margin: auto; padding: 10px; border-bottom: 1px solid #ccc;" >
                <a href="${link}" style="display: block; margin: 5px;" >
                    <img
                        width="24"
                        height="24"
                        loading="lazy"
                        alt="Icon Instagram"
                        style="object-fit: contain"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png"
                    />
                </a>
                <a href="${link}" style="display: block; margin: 5px;" >
                    <img
                        width="24"
                        height="24"
                        loading="lazy"
                        alt="Icon Instagram"
                        style="object-fit: contain"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                    />
                </a>
                <a href="${link}" style="display: block; margin: 5px;" >
                   <img
                        width="24"
                        height="24"
                        loading="lazy"
                        alt="Icon Instagram"
                        style="object-fit: contain"
                        src="https://upload.wikimedia.org/wikipedia/ru/thumb/9/9f/Twitter_bird_logo_2012.svg/99px-Twitter_bird_logo_2012.svg.png"
                    />
                </a>
            </div>
        </div>
    </div>
</div> 
`;
