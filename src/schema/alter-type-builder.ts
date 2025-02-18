
import { OperationNodeSource } from '../operation-node/operation-node-source.js'
import { CompiledQuery } from '../query-compiler/compiled-query.js'
import { Compilable } from '../util/compilable.js'
import { QueryExecutor } from '../query-executor/query-executor.js'
import { QueryId } from '../util/query-id.js'
import { freeze } from '../util/object-utils.js'
import { AlterTypeNode } from '../operation-node/alter-type-node.js'

export class AlterTypeBuilder implements OperationNodeSource, Compilable  {
    readonly #props: AlterTypeBuilderProps

    constructor(props: AlterTypeBuilderProps) {
        this.#props = freeze(props)
    }

    toOperationNode(): AlterTypeNode {
        return this.#props.executor.transformQuery(
            this.#props.node,
            this.#props.queryId,
        )
    }

    compile(): CompiledQuery {
        return this.#props.executor.compileQuery(
          this.toOperationNode(),
          this.#props.queryId,
        )
      }
}


export interface AlterTypeBuilderProps {
    readonly queryId: QueryId
    readonly executor: QueryExecutor
    readonly node: AlterTypeNode
}