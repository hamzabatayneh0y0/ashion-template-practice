// import { rest } from 'msw';
// export const handlers = [
//   rest.get("https://fakestoreapi.com/products", (req, res, ctx) => {
//     console.log("MSW: intercepted ");
//     const t=[{
//            id: 1,
//           title: 'jakit',
//           description: 'jakit description',
//           price: 12,
//           category: 'men',
//           image:'https://example.com/fake-image.png' ,
//           rating: {
//             count: 10,
//             rate: 4.5,
//           },
//         }]
//     return res(
//       ctx.status(200),
//       ctx.json(t)
//     );
//   }),
// ];
