import "./styles.css";
import Avatar from "@/components/ui/avatar";

type CustomerStorySectionProps = {
  className?: string;
};

type CustomerStoryAuthor = {
  name: string;
  role: string;
  avatar: string;
};

type CustomerStory = {
  content: string;
  author: CustomerStoryAuthor;
};

const customerStories: CustomerStory[] = [
  {
    content:
      "Criar minha loja com o site.set foi a melhor decisão para o meu negócio. A plataforma é super intuitiva, e consegui colocar meus produtos à venda em poucos minutos.",
    author: {
      name: "Annete Bones",
      role: "CEO na Anne Corp",
      avatar: "/customer-01.png",
    },
  },
  {
    content:
      "Transformar minha ideia em uma loja online foi fácil e rápido. Adorei as opções de personalização e a simplicidade para gerenciar os pedidos. Já vejo meus produtos alcançando mais pessoas!",
    author: {
      name: "Jacob Jones",
      role: "CEO na JJ Corp",
      avatar: "/customer-02.png",
    },
  },
];

export const CustomerStorySection = ({
  className,
}: CustomerStorySectionProps) => {
  return (
    <section
      className={`customer-story-container relative flex items-center justify-center ${
        className || ""
      }`.trim()}
      aria-labelledby="customer-story-title"
      role="region"
    >
      <div className="container">
        <div className="customer-story-animate-in flex flex-col items-center gap-12">
          <h2
            id="customer-story-title"
            className="font-heading customer-story-title text-balance"
          >
            Quem utiliza, aprova!
          </h2>

          <div className="customer-story-grid" role="list">
            {customerStories.map((customerStory, index) => (
              <article
                key={customerStory.author.name}
                className="customer-story-card"
                role="listitem"
                aria-labelledby={`customer-story-author-${index}`}
                aria-describedby={`customer-story-content-${index}`}
              >
                <blockquote
                  id={`customer-story-content-${index}`}
                  className="customer-story-content"
                  cite={customerStory.author.name}
                >
                  &ldquo;{customerStory.content}&rdquo;
                </blockquote>

                <footer className="customer-story-author">
                  <Avatar.Container className="flex items-center gap-4 text-content-tertiary text-sm mb-8">
                    <Avatar.Image
                      size="md"
                      src={customerStory.author.avatar}
                      alt={customerStory.author.name}
                    />
                    <Avatar.Content>
                      <Avatar.Title>{customerStory.author.name}</Avatar.Title>
                      <Avatar.Description>
                        {customerStory.author.role}
                      </Avatar.Description>
                    </Avatar.Content>
                  </Avatar.Container>
                </footer>
              </article>
            ))}
          </div>
        </div>

        {/* Descrição para leitores de tela */}
        <p className="sr-only">
          Seção com depoimentos de clientes satisfeitos que utilizaram a
          plataforma para criar suas lojas online
        </p>
      </div>
    </section>
  );
};
