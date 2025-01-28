class Body extends LabFrame {

    constructor(st) {
        super( extend({ 
            x:     0,
            y:     0,
            r:     1,
            dir:   0,
            mass:  100,
            speed: 0,
        }, st) )

        // install pods
        const body = this
        body.install( new dna.space.pod.Mover() )
        if (isArray(this.pods)) {
            this.pods.forEach(pod => body.install(pod))
        }
    }

    lxy(gx, gy) {
        const cdir = -this.dir,
              lx = gx - this.x,
              ly = gy - this.y
        return [
            lx * cos(cdir) - ly * sin(cdir),
            lx * sin(cdir) + ly * cos(cdir),
        ]
    }

    gxy(lx, ly) {
        const { x, y, dir } = this
        const gx = lx * cos(dir) - ly * sin(dir),
              gy = lx * sin(dir) + ly * cos(dir)
        return [
            x + gx,
            y + gy,
        ]
    }

    pick(x, y, ls) {
        if (this.dead) return

        const lxy = this.lxy(x, y)
        const dist = math.length( lxy[0], lxy[1] )
        if (dist <= this.r) {
            ls.push(this)
            return this
        }
    }

    install(pod) {
        // determine the install alias
        const name  = pod.name
        const alias = pod.alias || pod.name

        // run pre-install procedures
        if (isFun(pod.preInstall)) pod.preInstall(this)

        // uninstall the previous pod if present
        const prevPod = this[alias]
        if (prevPod) {
            if (isFun(prevPod.onReplace)) prevPod.onReplace(pod)
            this.uninstall(prevPod)
        }

        // install a new one
        this.attach(pod, pod.name || pod.alias)
        if (pod.name !== alias) this[alias] = pod
        if (isFun(pod.onInstall)) pod.onInstall()
    }

    uninstall(pod) {
        if (!pod) return false
        
        if (isString(pod)) {
            const podEntity = this[pod]
            if (!podEntity) return false
            pod = podEntity
        }

        if (isFun(pod.onUninstall)) pod.onUninstall()
        this.detach(pod)
        if (pod.alias && pod.alias !== pod.name) {
            delete this[pod.alias]
        }
        return true
    }

    drawRadius() {
        if (!env.showRadius) return
        lineWidth(1)
        stroke('#b0ff20')
        circle(0, 0, this.r)
    }

}
