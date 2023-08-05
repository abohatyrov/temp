"use client";
import { Container, Grid, Typography } from "@mui/material";
import BoxContainer from "/components/BoxContainer/BoxContainer";
import TeamCard from "../../components/TeamCard";

const teamDataset = [
  {
    id: "1",
    image: "https://d2bj1fdxpytfk0.cloudfront.net/img/IMG_0625.jpg",
    name: "Максим",
    position: "",
    description:
      "Шеф та засновник «SYODŌ» Максим знає, що випадковості не випадкові. Якби не перша робота на фуд-корті, не було б подальшого стажування на кухнях ресторанів у Києві та Одесі, навчання у столиці та численних майстеркласів у гуру кулінарії. У Львові Максим отримав досвід роботи бренд-шефом у «NOA», «Mon chef» та «Живий хліб». Тут на нього також чекав досвід викладання у кулінарній школі, любов до європейської та азіатської кухні і мрії про відкриття власного закладу. Усі мрії та знання він втілив у «SYODŌ»!",
    socials: [], 
  },
  {
    id: "2",
    image: "https://d2bj1fdxpytfk0.cloudfront.net/img/IMG_0637.jpg",
    name: "Алішер",
    position: "",
    description:
      "Його подорож Україною у 17 років стала початком значно важливішої мандрівки! Зупиняючись в різних містах, Алішер працював у бістро та ресторанах, а коли зацікавився японською культурою – вдосконалював навички у закладах азіатської кухні. Два роки працював у «Суші Мастер», згодом у «Ескобар» і віднайшов гармонію у «SYODŌ»!",
    socials: [], 
  },
  {
    id: "3",
    image: "https://d2bj1fdxpytfk0.cloudfront.net/img/IMG_0647.jpg",
    name: "Олексій",
    position: "",
    description:
      "Олексій прихильник здобуття досвіду поза рамками. Випробував на собі ритм роботи у пабі, вдосконалив навички європейської кухні в ресторані «Mon Chef», готував булочки у польській пекарні і отримав посаду шеф-кухаря у закладі паназіатської кухні «NOA». У «SYODŌ» втілює у життя мистецтво поєднувати!",
    socials: [], 
  },
];

export default function AboutPageContent() {
  return (
    <Container sx={{ pt: 6, pb: 10 }}>
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} md={6}>
        <BoxContainer p={3}>
          <Typography variant="h4" textTransform="uppercase" mb={2}>
            про нас
          </Typography>

          <Typography variant="body2">
            Знайомтесь, SYODŌ – доставка японської кухні, що поважає деталі!
          </Typography>
          <Typography variant="body2" mt={1}>
            Наші суші не існують окремо від свіжих продуктів, професійний
            сервіс супроводжує ввічливість, а традиційні рецепти стають
            основою сучасних смакових інтерпретацій. Секрет у тому, що
            команда SYODŌ осягнула мистецтво поєднувати.
          </Typography>
          <Typography variant="body2" mt={1}>
            Кожного місяця ми оновлюємо наше меню, зважаючи на актуальність
            та побажання гостей. Кухня SYODŌ відкрита для ваших поглядів.
            Нам немає чого приховувати – ми дбаємо про високу якість
            продуктів та чистоту робочого місця.
          </Typography>
          <Typography variant="body2" mt={1}>
            Прагнемо, щоб у нас кожен знайшов щось для себе – від
            гастро-задоволення до гастро-сповільнення у шаленому ритмі
            життя. 
          </Typography>
         
          <Typography variant="body2" mt={1}>
            SYODŌ: ода до смаку, деталей, щирості та традицій!
          </Typography>
        </BoxContainer>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
        <img
          src="https://d2bj1fdxpytfk0.cloudfront.net/img/aboutus.jpg"
          alt="about us"
          style={{
            width: "85%",
            opacity: 1.0,
            border: "2px solid black",
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h4" textTransform="uppercase" my={3}>
          команда
        </Typography>
      </Grid>
    </Grid>
    <Grid
      container
      justifyContent="center"
      spacing={3}
      mb={5}
      sx={{ display: "flex", alignItems: "stretch" }}
    >
      {(teamDataset ?? []).map((teamMember) => (
        <Grid item key={teamMember.id} xs={12} sm={6} md={4}>
          <BoxContainer p={2} sx={{ height: "100%" }}>
            <TeamCard
              image={teamMember.image}
              name={teamMember.name}
              position={teamMember.position}
              description={teamMember.description}
              socials={
                <>
                  {(teamMember.socials ?? []).map((social) => (
                    <Box
                      key={social.name}
                      component="i"
                      color="#55acee"
                      fontSize="1.125rem"
                      className={social.className}
                    />
                  ))}
                </>
              }
            />
          </BoxContainer>
        </Grid>
      ))}
    </Grid>
  </Container>);
}
