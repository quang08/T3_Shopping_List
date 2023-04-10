import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const itemRouter = createTRPCRouter({
  addItem: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      const item = await ctx.prisma.shoppingItem.create({
        data: {
          name,
        },
      });

      return item;
    }),

  getAllItems: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.shoppingItem.findMany();
    return items;
  }),

  deleteItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const item = await ctx.prisma.shoppingItem.delete({
        where: {
          id,
        },
      });

      return item;
    }),

  toggleChecked: publicProcedure
    .input(z.object({ id: z.string(), checked: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { id, checked } = input;

      const item = ctx.prisma.shoppingItem.update({
        where: {
          id,
        },
        data: {
          checked,
        },
      });

      return item;
    }),
});
