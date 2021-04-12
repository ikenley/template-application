import MarketShareModel from "./MarketShareModel";

export type MarketShareModelOption = {
  id: MarketShareModel;
  name: string;
  description: string;
  img: string;
};

const marketShareOptions: MarketShareModelOption[] = [
  {
    id: MarketShareModel.MostRecentYear,
    name: "Most Recent Year",
    description:
      "Quisque vel diam lacus. In non consequat purus. Donec placerat venenatis vestibulum. Sed non nisi dolor. Cras nisl massa, rhoncus vitae velit ut, fermentum ullamcorper neque.",
    img: "https://via.placeholder.com/450x250?text=Placeholder",
  },
  {
    id: MarketShareModel.AverageAllYears,
    name: "Average All Years",
    description:
      "Suspendisse volutpat faucibus tortor, in tincidunt risus. Suspendisse potenti. Ut malesuada mattis dolor non efficitur. In a erat sagittis, ultrices arcu eu, malesuada dui.",
    img: "https://via.placeholder.com/450x250?text=Placeholder",
  },
  {
    id: MarketShareModel.AllIncrease,
    name: "All Increase",
    description:
      "Praesent mattis pretium tempus. Donec ut risus ac elit maximus porta sit amet lobortis arcu. Integer consectetur rutrum turpis, eu rhoncus lacus convallis vitae. Donec mollis.",
    img: "https://via.placeholder.com/450x250?text=Placeholder",
  },
  {
    id: MarketShareModel.AllDescrease,
    name: "All Descrease",
    description:
      " In pellentesque mattis volutpat. Mauris ultricies efficitur tortor, a sodales dolor tristique sit amet. Praesent tincidunt erat ipsum, pulvinar varius.",
    img: "https://via.placeholder.com/450x250?text=Placeholder",
  },
  {
    id: MarketShareModel.HighestObserved,
    name: "Highest Observed",
    description:
      "Etiam sit amet tortor sit amet mi dapibus pharetra. Sed lacus est, consequat tristique ante vel, blandit suscipit quam. Pellentesque eget consequat dui, in congue elit.",
    img: "https://via.placeholder.com/450x250?text=Placeholder",
  },
  {
    id: MarketShareModel.LowestObserved,
    name: "Lowest Observed",
    description:
      "In in tristique eros. Proin ac mauris justo. Duis id ornare leo. Donec accumsan odio massa, a rutrum lacus semper sit amet.",
    img: "https://via.placeholder.com/450x250?text=Placeholder",
  },
];

export default marketShareOptions;
