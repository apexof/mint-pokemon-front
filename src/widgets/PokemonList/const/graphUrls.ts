import { ChainId } from '@/entities/Chain'

export const subgraphUrl: Record<ChainId, string> = {
  11_155_111: 'https://api.studio.thegraph.com/query/44553/pokemon-graph-sepolia/version/latest',
  137: 'https://api.studio.thegraph.com/query/44553/pokemon-graph-polygon/version/latest',
  80_002: 'https://api.studio.thegraph.com/query/44553/pokemo-graph-amoy/version/latest',
}
